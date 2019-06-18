/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import { StyleSheet } from 'react-native';
import { 
  YELLOW_DARK, 
  YELLOW_LIGHT,
  BLACK,
  WHITE
} from '../../../../util/colors';

export default StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderRadius: 5,
    flex: 1, 
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 13,
    marginLeft: 20,
    lineHeight: 18
  },
  disciplineInitials: {
    backgroundColor: YELLOW_DARK,
    borderColor: YELLOW_LIGHT,
    borderWidth: 1,
    borderRadius: 100,
    position: 'relative',
    width: 63,
    height: 63
  },
  disciplineInitialsText: {
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    left: 17,
    top: 8,
    color: WHITE
  },
  disciplineInitialsNumberText: {
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    left: 17,
    top: 28,
    color: WHITE
  },
  cardWorkload: {
    bottom: 5,
    position: 'absolute',
    right: 10
  },
  cardWorkloadText: {
    fontSize: 13,
    color: BLACK,
  }
});