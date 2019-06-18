/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, Alert, PermissionsAndroid} from 'react-native';
import ScreenStandard from '../../ScreenStandard';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {WHITE} from '../../../util/colors';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import ContactsService from '../../../backend/ContactService';

export default class SpeedDialScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      identifier: '',
    }
  }
  
  /**
   * @param {String} phone
   * @private
   */
  _callNumber = (phone) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CALL_PHONE).then(() => {
      RNImmediatePhoneCall.immediatePhoneCall(phone)
    });
  };
  
  /**
   * @private
   */
  _onPressMakeCall = () => {
    const me = this;
    
    const contactService = new ContactsService();
    contactService.getPhoneByIdentifier(me.state.identifier)
      .then(payload => {
        me._callNumber(payload.contact.phone);
      })
      .catch(error => {
        Alert.alert('Ops', error.message,
          [{
            text: 'Fechar'
          }], {
            cancelable: false
          });
      })
  };
  
  render() {
    const { phoneNumber } = this.state;
    
    return (
      <ScreenStandard>
          <Text style={styles.title}>Digite o RAMAL</Text>
  
          <View>
            <TextInput
              autoCorrect={false}
              autoFocus={true}
              placeholder="99"
              scrollEnabled={false}
              keyboardType="phone-pad"
              autoCapitalize="none"
              style={styles.inputText}
              defaultValue={phoneNumber}
              onChangeText={(value) => this.setState({ identifier: value })} />
          </View>
  
          <TouchableOpacity style={styles.button} onPress={this._onPressMakeCall}>
            <Text style={styles.buttonText}>
              <MaterialIcon
                name="phone-forward"
                size={20}
                color={WHITE} /> DISCAR
            </Text>
          </TouchableOpacity>
      </ScreenStandard>
    );
  }
}