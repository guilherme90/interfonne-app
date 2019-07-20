/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import {
  StatusBar,
  ScrollView,
  SafeAreaView ,
  View
} from 'react-native';
import styles from '../util/styles';

export default class ScreenStandard extends Component {
  constructor(props) {
    super(props)
  }
  
  render(): Component {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps || 'never'}>
          <StatusBar backgroundColor={'#1C313A'} barStyle="default"/>

          <View style={styles.container}>
            {this.props.children}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}