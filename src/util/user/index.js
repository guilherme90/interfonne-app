/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import AsyncStorage from '@react-native-community/async-storage';

/**
 * @return {Object}
 */
async function getUser (): Object {
  try {
    const retrievedItem = await AsyncStorage.getItem('user');
    const user = JSON.parse(retrievedItem);
    
    return user;
  } catch (error) {

  }
}

export default getUser;