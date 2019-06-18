/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import { StatusBar, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import LoginForm from './LoginForm';
import RegisterScreen from '../Register/RegisterScreen';
import HomeStack from '../Home/HomeStackNavigation';
import styles from './styles';
import {BLUE_LIGHT, DARK_LIGHT, GRAY, WHITE} from '../../util/colors';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  render(): Component {
    return (
      <KeyboardAwareScrollView style={styles.scrollViewContainer}>
        <StatusBar backgroundColor={DARK_LIGHT} barStyle="default" />

        <View style={styles.container}>
          <Text style={{fontSize: 24, color: GRAY, marginBottom: 20, letterSpacing: 1}}>INTERFONNE</Text>
        </View>
        
        <LoginForm navigation={this.props.navigation} />
      </KeyboardAwareScrollView>
    );
  }
}

export default createAppContainer(createStackNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        headerMode: 'none',
        title: '',
        header: null
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerMode: 'none',
        title: '',
        header: null
      }),
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: () => ({
        title: 'Criar Conta',
        mode: 'modal',
        headerStyle: {
          backgroundColor: BLUE_LIGHT
        },
        headerTintColor: WHITE
      }),
    }
  },
  {
    initialRouteName: 'Login'
  }
));