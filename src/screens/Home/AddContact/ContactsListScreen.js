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
import _ from 'lodash';

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
  _onPressContactSelect = (item): void => {
    this.props.navigation.navigate('AddContact', {
      givenName: item.givenName,
      familyName: item.familyName || '',
      phoneNumbers: item.phoneNumbers
    });
  };
  
  _randomColor = (str) => {
    let hash = 0;
    let colour = '#';
    
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    
    return colour;
  };
  
  _remountContactsList = (data) => {
    data.map((current, index, item) => {
      if (item[index + 1]) {
        if (current.givenName === item[index + 1].givenName) {
          current.phoneNumbers = [
            ...current.phoneNumbers,
            ...item[index + 1].phoneNumbers
          ].map(phone => {
            return {
              id: phone.id,
              label: phone.label,
              number: phone.number.replace(/[\-\s]/g, '')
            }
          });
          
          data.splice(index + 1, 1);
        }
      }
  
      current.phoneNumbers = _.uniqBy(current.phoneNumbers, 'number');
    });
    
    return data;
  };
  
  componentDidMount(): void {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(() => {
      this.setState({
        loading: true
      });
      
      Contacts.getAll((err, contacts) => {
        if (err !== 'denied') {
          const data = _.sortBy(contacts, ['givenName', 'familyName']);
          
          this.setState({
            loading: false,
            contacts: this._remountContactsList(data)
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
  
  _getPhoneNumbers = (phones) => {
    const numbers = _.map(phones, 'number');
    return numbers.join(', ');
  };
  
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
                        overlayContainerStyle={{backgroundColor: this._randomColor(item.givenName)}}
                      />
                    }
                    subtitle={item.phoneNumbers.length > 0 && this._getPhoneNumbers(item.phoneNumbers)}
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