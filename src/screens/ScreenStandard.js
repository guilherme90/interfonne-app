/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, {Component} from 'react';
import { StatusBar, ScrollView, SafeAreaView , View } from 'react-native';
import styles from '../util/styles';

export default class ScreenStandard extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          <StatusBar backgroundColor={'#1C313A'} barStyle="default"/>

          <View style={styles.container}>
            {this.props.children}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}