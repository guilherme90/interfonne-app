/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import { StyleSheet, Dimensions } from 'react-native';
import {
  BLUE_LIGHT,
  GRAY,
  WHITE
} from '../../../../util/colors';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingTop: 20
  },
  inputText: {
    height: 40,
    backgroundColor: WHITE,
    borderBottomColor: GRAY,
    borderBottomWidth: 2
  },
  button: {
    padding: 10,
    backgroundColor: '#43A047',
    borderColor: '#43A047',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: '95%',
    marginTop: 15
  },
  buttonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  label: {
    color: '#808080',
    fontWeight: 'normal',
    fontSize: 14,
    textAlign: 'center'
  },
  textValidation: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ff7961',
    marginTop: 5
  }
});