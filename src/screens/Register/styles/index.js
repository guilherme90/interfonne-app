/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import { StyleSheet } from 'react-native';
import {
  BLUE_DARK,
  BLUE_LIGHT, GRAY,
  WHITE
} from '../../../util/colors';

export default StyleSheet.create({
  header: {
    alignItems: 'center'
  },
  headerImage: {
    width: 200,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contain',
    alignItems: 'center'
  },
  spinnerTextStyle: {
    color: BLUE_LIGHT
  },
  scrollViewContainer: {
    backgroundColor: WHITE,
  },
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
  inputRow: {
    paddingBottom: 20
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