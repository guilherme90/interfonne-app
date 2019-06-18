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
  View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import validation from '../../../util/validation';
import constraints from './validation';
import SettingService from '../../../backend/SettingService';
import {WHITE} from "../../../util/colors";

export default class ChangeAccountScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user_id: '',
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
    
    const resultValidation = validation({
      name: me.state.name,
      email: me.state.email,
      password: me.state.password
    }, constraints);
    
    if (resultValidation) {
      me.setState({
        formValidation: resultValidation
      });
      
      return;
    }
    
    me.setState({
      loading: true
    });
    
    const settingService = new SettingService();
    settingService.changeAccount(
      me.state.name.trim(),
      me.state.email.trim(),
      me.state.password.trim(),
      me.state.user_id
      )
      .then(payload => {
        me.setState({
          loading: false
        });
        
        me.props.navigation.navigate('SettingScreen');
      })
      .catch(error => {
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
  
  componentDidMount() {
    const data = this.props.navigation.getParam('data');
    
    this.setState({
      name: data.name,
      email: data.email,
      password: data.password
    })
  }
  
  render() {
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
              color={WHITE} /> ATUALIZAR
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}