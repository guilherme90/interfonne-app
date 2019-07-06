/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import { StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import {BLUE_DARK} from '../../util/colors';
import RegisterForm from './RegisterForm';

class RegisterScreen extends Component {
  render(): Component {
    return (
      <KeyboardAwareScrollView style={styles.scrollViewContainer}>
        <StatusBar backgroundColor={BLUE_DARK} barStyle="default" />
        
        <RegisterForm navigation={this.props.navigation} />
      </KeyboardAwareScrollView>
    );
  }
}

export default RegisterScreen;