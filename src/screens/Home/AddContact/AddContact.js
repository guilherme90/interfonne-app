/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  Picker,
  StatusBar,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {BLUE_DARK, WHITE} from '../../../util/colors';
import validation from '../../../util/validation';
import constraints from './validation';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ContactService from '../../../backend/ContactService';
import getUser from '../../../util/user';

class AddContact extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      contact_id: null,
      user_id: '',
      name: '',
      phone: '',
      digit: '',
      formValidation: {
        name: [],
        phone: [],
        digit: []
      },
      width: Dimensions.get('window').width
    }
  }
  
  onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  };
  
  onPress = e => {
    const me = this;
  
    const resultValidation = validation({
      name: me.state.name,
      phone: me.state.phone,
      digit: me.state.digit
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
    
    const contactService = new ContactService;
    contactService.saveContact(me.state.contact_id, [
      me.state.user_id,
      me.state.name.trim(),
      me.state.phone.trim(),
      me.state.digit.trim()
    ])
      .then(payload => {
        me.setState({
          loading: false
        });
        
        this.props.navigation.navigate('ContactsScreen', {
          reset: true
        });
      })
      .catch(error => {
        me.setState({
          loading: false
        });
        
        Alert.alert('Ops', 'Este ramal já pertence a um contato',
          [{
            text: 'Fechar'
          }], {
            cancelable: false
          });
      });
  };
  
  componentDidMount() {
    const contact = this.props.navigation.state.params;
    let phone = '';
    
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      phone = contact.phoneNumbers[0].number;
    }
    
    if (contact.phone) {
      phone = contact.phone;
    }
  
    getUser().then(user => {
      this.setState({
        contact_id: contact.contact_id || null,
        user_id: user.user_id,
        name: `${contact.givenName || ''} ${contact.familyName || ''}`,
        phone: phone,
        digit: contact.digit || ''
      });
    });
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
    
    const contact = this.props.navigation.state.params;
    
    return (
      <KeyboardAwareScrollView>
        <StatusBar backgroundColor={BLUE_DARK} barStyle="default" />
  
        <View style={styles.container} onLayout={this.onLayout}>
          <Spinner visible={this.state.loading} textContent={''} />
  
          <View style={{marginBottom: 20}}>
            <Text style={styles.label}>Ramal</Text>
            <TextInput
              autoCorrect={false}
              autoFocus={true}
              
              keyboardType="numeric"
              onChangeText={(value) => this.setState({ digit: value })}
              defaultValue={this.state.digit}
              style={styles.inputText} />

            {this.state.formValidation.digit && this.state.formValidation.digit.map((item, index) => (
              <Text style={styles.textValidation} key={index}>{item}</Text>
            ))}
          </View>
  
          <View style={{marginBottom: 20}}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              autoCorrect={false}
              autoCapitalize="words"
              keyboardType="default"
              dataDetectorTypes="all"
              editable={contact.givenName === ''}
              onChangeText={(value) => this.setState({ name: value })}
              defaultValue={`${contact.givenName || ''} ${contact.familyName || ''}`}
              style={styles.inputText} />

            {this.state.formValidation.name && this.state.formValidation.name.map((item, index) => (
              <Text style={styles.textValidation} key={index}>{item}</Text>
            ))}
          </View>
  
          {contact.phoneNumbers && contact.phoneNumbers.length > 0 && (
            <View style={{marginBottom: 20}}>
              <Text style={styles.label}>Números do Contato</Text>
  
              <Picker
                selectedValue={this.state.phone}
                style={styles.inputText}
                prompt="Selecione o Telefone"
                onValueChange={(itemValue, itemIndex) => this.setState({phone: itemValue })} >
                {contact.phoneNumbers.map(phone => <Picker.Item label={phone.number} value={phone.number} key={phone.number} />)}
              </Picker>
            </View>
          )}
          
          {!contact.phoneNumbers && (
            <View style={{marginBottom: 20}}>
              <Text style={styles.label}>Número do Telefone</Text>
              <TextInput
                autoCorrect={false}
                keyboardType="numeric"
                defaultValue={this.state.phone}
                onChangeText={(value) => this.setState({ phone: value })}
                style={styles.inputText} />
            </View>
          )}
  
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text style={styles.buttonText}>
              <MaterialIcon
                name="content-save"
                size={20}
                color={WHITE} /> SALVAR
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default AddContact;