/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import LoginScreen from './screens/Login/LoginScreen';
import HomeStack from './screens/Home/HomeStackNavigation';
import getUser from './util/user';
import Splash from './Splash';

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
  
  render(): Component {
    const { user, loading } = this.state;
  
    if (loading) {
      return <Splash />
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
