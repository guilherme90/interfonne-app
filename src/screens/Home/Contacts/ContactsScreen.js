/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
  PermissionsAndroid
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  ListItem,
  Avatar,
  Button,
  Card
} from 'react-native-elements';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

import ScreenStandard from '../../ScreenStandard';
import ContactsService from '../../../backend/ContactService';
import getUser from "../../../util/user";
import randomColor from 'randomcolor';

export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      refreshing: false,
      contacts: []
    }
  }
  
  /**
   * @param {String} phone
   * @private
   */
  _callNumber = (phone): void => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CALL_PHONE).then(() => {
      RNImmediatePhoneCall.immediatePhoneCall(phone)
    });
  };
  
  /**
   * @private
   */
  _getContacts = (): void => {
    const me = this;
    const screenProps = this.props.screenProps;
    
    const allContacts = (userId) => {
      const contactService = new ContactsService();
      contactService.getContacts(userId)
        .then(payload => {
          me.setState({
            loading: false,
            refreshing: false,
            contacts: payload.contacts
          });
        })
        .catch(error => {
          me.setState({
            loading: false,
            refreshing: false
          });
        });
    };
    
    if (undefined === screenProps) {
      getUser().then(user => {
        me.setState({
          loading: true
        });
    
        allContacts(user.user_id)
      });
      
      return;
    }
    
    if (screenProps.user) {
      me.setState({
        loading: true
      });
      
      allContacts(screenProps.user.user_id);
    }
  };
  
  /**
   * @param {Object} item
   * @private
   */
  _onPressContactSelect = (item): void => {
    const me = this;
    const params = this.props.navigation.state.params;
    const props = this.props.screenProps;
    
    if (props && props.user) {
      me.props.navigation.navigate('AddContact', {
        user_id: props.user.user_id,
        contact_id: item.contact_id,
        givenName: item.name,
        phone: item.phone,
        digit: item.identifier.toString()
      });
      
      return;
    }
    
    me.props.navigation.navigate('AddContact', {
      user_id: params.user.user_id,
      contact_id: item.contact_id,
      givenName: item.name,
      phone: item.phone,
      digit: item.identifier.toString()
    });
  };
  
  /**
   * @private
   */
  _onRefresh = (): void => {
    this.setState({
      refreshing: true
    });
    
    this._getContacts();
  };
  
  /**
   * @param {Number} contactId
   * @private
   */
  _onPressRemoveContact = (contactId): void => {
    const me = this;
  
    Alert.alert(
      'Confirmação',
      'Você deseja remover este contato?',
      [
        {
          text: 'cancelar',
          style: 'cancel',
        },
        {
          text: 'SIM',
          onPress: () => {
            me.setState({
              loading: true
            });
  
            const contactService = new ContactsService();
            contactService.removeContact(contactId)
              .then(payload => {
                me._getContacts();
              })
              .catch(error => {
                me.setState({
                  loading: false,
                  refreshing: false
                });
              })
          }
        },
      ],
      {
        cancelable: false
      },
    );
  };
  
  /**
   * @param {Number} contactId
   * @private
   */
  _onPressMakeCall = (contactId): void => {
    const me = this;
    
    const contactService = new ContactsService();
    contactService.getContactById(contactId)
      .then(payload => {
        this._callNumber(payload.contact.phone);
      })
      .catch(error => {
        me.setState({
          loading: false,
          refreshing: false
        });
      })
  };
  
  componentDidMount(): void {
    this._getContacts();
  }
  
  componentDidUpdate(): void {
    const {navigation} = this.props;
    const reset = navigation.getParam('reset', false);
    
    // refresh after add / edit contact
    if (reset) {
      navigation.state.params.reset = false;
      
      this._getContacts();
    }
  }
  
  render(): Component {
    return (
      <KeyboardAwareScrollView>
        <ScreenStandard>
          <Spinner visible={this.state.loading} textContent={''} />
          
          {!this.state.loading && this.state.contacts.length === 0 && (
            <Card>
              <Text>Nenhum contato cadastrado.</Text>
            </Card>
          )}
          
          {!this.state.loading && this.state.contacts.length > 0 && (
            <FlatList
              keyExtractor={item => item.contact_id.toString()}
              data={this.state.contacts}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={e => this._onPressContactSelect(item)}>
                  <ListItem
                    roundAvatar
                    title={<Text>{item.name}</Text>}
                    subtitle={item.phone}
                    leftAvatar={
                      <Avatar
                        size="medium"
                        rounded
                        title={item.identifier.toString()}
                        activeOpacity={0.7}
                        overlayContainerStyle={{backgroundColor: randomColor({ luminosity: 'bright'})}}
                      />
                    }
                    rightAvatar={
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: 100
                      }}>
                        <Button
                          onPress={e => this._onPressMakeCall(item.contact_id)}
                          buttonStyle={{
                            backgroundColor: '#009688',
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: '#009688'
                          }}
                          icon={
                            <MaterialIcon
                              name="phone"
                              size={20}
                              color="white"
                            />
                          }
                        />
  
                        <Button
                          onPress={e => this._onPressRemoveContact(item.contact_id)}
                          buttonStyle={{
                            backgroundColor: '#e53935',
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: '#e53935'
                          }}
                          icon={
                            <MaterialIcon
                              name="account-remove"
                              size={20}
                              color="white"
                            />
                          }
                        />
                      </View>
                    }
                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#F1F1F1' }}
                  />
                </TouchableOpacity>
              )}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          )}
        </ScreenStandard>
      </KeyboardAwareScrollView>
    );
  }
}