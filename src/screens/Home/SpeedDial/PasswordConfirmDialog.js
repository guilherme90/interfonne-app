/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, { Component } from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import ScreenStandard from '../../ScreenStandard';
import getUser from '../../../util/user';
import {WHITE} from '../../../util/colors';
import styles from './styles';

export default class PasswordConfirmDialog extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      passwordConfirmation: ''
    };
  }
  
  _onPressPasswordConfirm = () => {
    const props = this.props.screenProps;
    
    if (props.user && props.user.password !== this.state.passwordConfirmation) {
      Alert.alert('Ops', 'Senha de confirmação inválida.',
        [{
          text: 'OK'
        }], {
          cancelable: false
        });
      
      return;
    }
    
    getUser().then(payload => {
      if (payload.password !== this.state.passwordConfirmation) {
        Alert.alert('Ops', 'Senha de confirmação inválida.',
          [{
            text: 'OK'
          }], {
            cancelable: false
          });
    
        return;
      }
  
      this.props.navigation.navigate('Home');
    });
  };
  
  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }
  
  render() {
    return (
      <ScreenStandard>
        <Text style={styles.title}>Digite a SENHA de confirmação</Text>
    
        <View>
          <TextInput
            placeholder="******"
            textContentType="none"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            secureTextEntry={true}
            style={styles.inputText}
            defaultValue={this.state.passwordConfirmation}
            onSubmitEditing={this._onPressPasswordConfirm}
            onChangeText={(value) => this.setState({ passwordConfirmation: value })} />
        </View>
  
        <TouchableOpacity style={styles.button} onPress={this._onPressPasswordConfirm}>
          <Text style={styles.buttonText}>
            <MaterialIcon
              name="signature"
              size={20}
              color={WHITE} /> CONFIRMAR
          </Text>
        </TouchableOpacity>
      </ScreenStandard>
    )
  }
}