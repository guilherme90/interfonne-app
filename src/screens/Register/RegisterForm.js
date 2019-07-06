/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import {
  Alert,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import validation from '../../util/validation';
import constraints from './validation';
import RegisterService from '../../backend/RegisterService';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {WHITE} from "../../util/colors";

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      email: '',
      password: '',
      formValidation: {
        name: [],
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
   * @param e
   * @private
   */
  _onPress = e => {
    const me = this;
    const data = {
      name: me.state.name.trim(),
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
      loading: true,
      formValidation: {
        name: [],
        email: [],
        password: []
      }
    });
    
    const registerService = new RegisterService();
    registerService.register(data.name, data.email, data.password).then(payload => {
      me.setState({
        loading: false
      });
      
      me.props.navigation.navigate('Login');
    }).catch(error => {
      me.setState({
        loading: false
      });
      
      Alert.alert('Ops', 'Este e-mail já está cadastrado',
        [{
          text: 'Fechar'
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
  
        <View style={{marginBottom: 20}}>
          <Text style={styles.label}>Nome Empresarial</Text>
          <TextInput
            autoCorrect={false}
            autoFocus={true}
            keyboardType="default"
            autoCapitalize="words"
            dataDetectorTypes="all"
            returnKeyType="next"
            defaultValue={this.state.name}
            style={styles.inputText}
            onChangeText={(value) => this.setState({ name: value })} />
    
          {this.state.formValidation.name && this.state.formValidation.name.map((item, index) => (
            <Text style={styles.textValidation} key={index}>{item}</Text>
          ))}
        </View>
  
        <View style={{marginBottom: 20}}>
          <Text style={styles.label}>Nome e-mail</Text>
          <TextInput
            autoCorrect={false}
            keyboardType="email-address"
            dataDetectorTypes="all"
            autoCapitalize="none"
            returnKeyType="next"
            defaultValue={this.state.email}
            style={styles.inputText}
            onChangeText={(value) => this.setState({ email: value })} />
          
          {this.state.formValidation.email && this.state.formValidation.email.map((item, index) => (
            <Text style={styles.textValidation} key={index}>{item}</Text>
          ))}
        </View>
  
        <View style={{marginBottom: 20}}>
          <Text style={styles.label}>Senha de acesso</Text>
          <TextInput
            autoCorrect={false}
            dataDetectorTypes="all"
            autoCapitalize="none"
            returnKeyType="done"
            defaultValue={this.state.password}
            secureTextEntry={true}
            style={styles.inputText}
            onChangeText={(value) => this.setState({ password: value })} />
    
          {this.state.formValidation.password && this.state.formValidation.password.map((item, index) => (
            <Text style={styles.textValidation} key={index}>{item}</Text>
          ))}
        </View>
  
        <TouchableOpacity style={styles.button} onPress={this._onPress}>
          <Text style={styles.buttonText}>
            <MaterialIcon
              name="content-save"
              size={20}
              color={WHITE} /> CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}