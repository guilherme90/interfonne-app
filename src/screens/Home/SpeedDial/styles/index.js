/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import { StyleSheet } from 'react-native';
import {
  BLUE_LIGHT,
  GRAY,
  WHITE
} from '../../../../util/colors';

export default StyleSheet.create({
  title: {
    color: '#808080',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: '#43A047',
    borderColor: '#43A047',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    marginTop: 15
  },
  buttonText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inputText: {
    height: 120,
    backgroundColor: WHITE,
    borderBottomColor: GRAY,
    borderBottomWidth: 2,
    fontSize: 42,
    textAlign: 'center',
    color: '#666'
  },
});