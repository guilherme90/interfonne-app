/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import {WHITE} from './util/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#434343'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default class Splash extends Component {
  render(): Component {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={WHITE} />
      </View>
    )
  }
}