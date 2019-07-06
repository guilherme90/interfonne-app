/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import validation from '../../util/validation'
import constraints from './validation';
import Spinner from 'react-native-loading-spinner-overlay';
import AuthenticationService from '../../backend/AuthenticationService';
import {WHITE} from "../../util/colors";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formValidation: {
        email: [],
        password: []
      },
      loading: false,
      width: Dimensions.get('window').width
    };
  }
  
  /**
   * @param e
   * @private
   */
  _onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  };
  
  /**
   * @param {Object} user
   * @returns {Promise<void>}
   * @private
   */
  _storeData = async (user): void => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.error(e)
    }
  };
  
  /**
   * @param e
   * @private
   */
  _onPress = (e): void => {
    const me = this;
    
    const data = {
      email: me.state.email.trim(),
      password: me.state.password.trim()
    };

    const resultValidation = validation(data, constraints);
    
    if (resultValidation) {
      me.setState({
        formValidation: resultValidation
      });

      return;
    }

    me.setState({
      loading: true
    });
    
    const authentication = new AuthenticationService();
    authentication.authenticate(data.email, data.password)
      .then(payload => {
        me.setState({
          loading: false,
          email: '',
          password: ''
        });
  
        me._storeData(payload.user);
  
        this.props.navigation.navigate('ContactsScreen', {
          user: payload.user
        });
      }).catch(error => {
        me.setState({
          loading: false
        });
  
        Alert.alert('Ops', error.message,
          [{
            text: 'OK'
          }], {
            cancelable: false
          });
      });
  };

  render(): Component {
    styles.inputText = {
      ...styles.inputText,
      width: this.state.width - 20
    };

    styles.container = {
      ...styles.container,
      width: this.state.width
    };

    return (
      <View style={styles.container} onLayout={this._onLayout}>
        <Spinner visible={this.state.loading} textContent={''} />
        
        <View>
          <Text style={styles.label}>Seu e-mail</Text>
          <TextInput
            autoCorrect={false}
            placeholder="Seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            style={styles.inputText}
            defaultValue={this.state.email}
            onChangeText={(value) => this.setState({ email: value })} />

            {this.state.formValidation.email && this.state.formValidation.email.map((item, index) => (
              <Text style={styles.textValidation} key={index}>{item}</Text>
            ))}
        </View>

        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Senha de acesso</Text>
          <TextInput 
            placeholder="******" 
            textContentType="none"
            autoCapitalize="none"
            returnKeyType="done"
            style={styles.inputText}
            defaultValue={this.state.password}
            secureTextEntry={true}
            onChangeText={(value) => this.setState({ password: value })}
          />

          {this.state.formValidation.password && this.state.formValidation.password.map((item, index) => (
            <Text style={styles.textValidation} key={index}>{item}</Text>
          ))}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={this._onPress}>
          <Text style={styles.buttonText}>
            <MaterialIcon
              name="check-outline"
              size={20}
              color={WHITE} /> ENTRAR
          </Text>
        </TouchableOpacity>

        <Text style={{color: '#F3F3F3', fontSize: 18, marginTop: 20}}>Não possui uma conta?</Text>
        <TouchableOpacity style={{...styles.button, backgroundColor: '#EFEFEF', borderColor: '#EFEFEF', marginTop: 5}} onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{...styles.buttonText, color: '#434343'}}>CADASTRE-SE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}