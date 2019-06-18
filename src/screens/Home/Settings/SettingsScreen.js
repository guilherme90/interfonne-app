/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Card,
  Button,
  ListItem,
  Avatar
} from 'react-native-elements'

import ScreenStandard from '../../ScreenStandard';
import getUser from '../../../util/user';
import { NavigationActions } from 'react-navigation';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: null,
      loading: false
    }
  }
  
  _onPressLogoutConfirm = () => {
    const me = this;
    
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'CANCELAR',
          style: 'cancel',
        },
        {
          text: 'SIM',
          onPress: () => {
            AsyncStorage.removeItem('user');
  
            me.props.navigation.navigate(NavigationActions.navigate({
              routeName: 'Login',
              action: NavigationActions.navigate({
                routeName: 'LoginScreen'
              })
            }))
          }
        },
      ],
      {
        cancelable: false
      },
      'secure-text'
    );
  };
  
  /**
   * @private
   */
  _onPressChangeAccount = () => {
    const me = this;
  
    console.log(me.props.navigation)
    me.props.navigation.navigate('ChangeAccount', {
      data: me.state.user
    });
  };
  
  _getUser = () => {
    const me = this;
    const props = me.props.screenProps;
    
    if (undefined === props) {
      getUser().then(user => {
        me.setState({
          user: user
        });
      });
    
      return;
    }
  
    if (props.user) {
      me.setState({
        user: props.user
      });
    }
  };
  
  componentDidMount(): void {
    this._getUser();
  }
  
  render() {
    const me = this;
    const { user } = me.state;
    
    return (
      <ScreenStandard>
        {null !== user && (
          <View>
            <View>
              <TouchableOpacity onPress={this._onPressChangeAccount}>
                <ListItem
                  key={user.name}
                  title={'Nome Empresarial'}
                  subtitle={user.name}
                  roundAvatar
                  leftAvatar={
                    <Avatar
                      size="medium"
                      rounded
                      activeOpacity={0.7}
                      overlayContainerStyle={{backgroundColor: '#0288d1'}}
                      icon={{name: 'account', type: 'material-community'}}
                    />
                  }
                />
              </TouchableOpacity>
            </View>
    
            <View>
              <TouchableOpacity onPress={this._onPressChangeAccount}>
                <ListItem
                  key={user.email}
                  title={'Email'}
                  subtitle={user.email}
                  roundAvatar
                  leftAvatar={
                    <Avatar
                      size="medium"
                      rounded
                      activeOpacity={0.7}
                      overlayContainerStyle={{backgroundColor: '#f57c00'}}
                      icon={{name: 'email', type: 'material-community'}}
                    />
                  }
                />
              </TouchableOpacity>
            </View>
    
            <View>
              <TouchableOpacity onPress={this._onPressChangeAccount}>
                <ListItem
                  key={Math.random()}
                  title={'Senha de Acesso'}
                  subtitle={'******'}
                  roundAvatar
                  leftAvatar={
                    <Avatar
                      size="medium"
                      rounded
                      activeOpacity={0.7}
                      overlayContainerStyle={{backgroundColor: '#388e3c'}}
                      icon={{name: 'security', type: 'material-community'}}
                    />
                  }
                />
              </TouchableOpacity>
            </View>
  
            <Button
              type="outline"
              raised
              title='SAIR COM SEGURANÇA'
              onPress={this._onPressLogoutConfirm}
            />
          </View>
        )}
      </ScreenStandard>
    );
  }
}