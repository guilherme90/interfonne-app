/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LoginScreen from './screens/Login/LoginScreen';
import HomeStack from './screens/Home/HomeStackNavigation';
import getUser from './util/user';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      user: {}
    };
  }
  
  componentDidMount(): void {
    this.setState({
      loading: true
    });
    
    getUser().then(payload => {
      this.setState({
        loading: false,
        user: payload
      })
    });
  }
  
  render() {
    const { user, loading } = this.state;
  
    if (loading) {
      return (
        <View>
          <Text>Carregando...</Text>
        </View>
      )
    }
    
    if (user !== null && Object.entries(user).length > 0) {
      const props = {
        ...this.props,
        user: user
      };
      
      return <HomeStack screenProps={props} />;
    }
    
    return <LoginScreen />;
  }
}
