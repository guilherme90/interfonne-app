/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  PermissionsAndroid
} from 'react-native';
import Contacts from 'react-native-contacts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  ListItem,
  Avatar,
  Card
} from 'react-native-elements';
import randomColor from 'randomcolor';

import ScreenStandard from '../../ScreenStandard';

export default class ContactsListScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      contacts: []
    }
  }
  
  /**
   * @param {Object} item
   * @private
   */
  _onPressContactSelect = (item) => {
    this.props.navigation.navigate('AddContact', {
      givenName: item.givenName,
      familyName: item.familyName || '',
      phoneNumbers: item.phoneNumbers
    });
  };
  
  componentDidMount() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(() => {
      this.setState({
        loading: true
      });
      
      Contacts.getAll((err, contacts) => {
        if (err !== 'denied') {
          this.setState({
            loading: false,
            contacts: contacts
          });
        }
        
        if (err === 'denied') {
          this.setState({
            loading: false
          });
          
          Alert.alert('Ops', 'Para carregar seus contatos, você precisa conceder permissão.',
            [{
              text: 'OK'
            }], {
              cancelable: false
            });
        }
      })
    })
  }
  
  render() {
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
              keyExtractor={item => item.rawContactId}
              data={this.state.contacts}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={(e) => this._onPressContactSelect(item)}>
                  <ListItem
                    roundAvatar
                    title={
                      <Text>{item.givenName} {item.familyName || ''}</Text>
                    }
                    leftAvatar={
                      <Avatar
                        size="small"
                        rounded
                        title={item.givenName.split('')[0]}
                        activeOpacity={0.7}
                        overlayContainerStyle={{backgroundColor: randomColor({ luminosity: 'bright'})}}
                      />
                    }
                    containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#F1F1F1' }}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </ScreenStandard>
      </KeyboardAwareScrollView>
    );
  }
}