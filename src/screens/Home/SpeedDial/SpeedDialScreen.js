/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  PermissionsAndroid,
  BackHandler
} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import {WHITE} from '../../../util/colors';
import ContactsService from '../../../backend/ContactService';
import ScreenStandard from '../../ScreenStandard';

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
  _callNumber = (phone): void => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CALL_PHONE).then(() => {
      RNImmediatePhoneCall.immediatePhoneCall(phone)
    });
  };
  
  /**
   * @private
   */
  _onPressMakeCall = (): void => {
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
  
  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }
  
  render(): Component {
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