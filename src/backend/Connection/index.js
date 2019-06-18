/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase({
  name : 'interfonne_db',
  location: 'default',
  createFromLocation : '~www/app_db.db3'
});

export default class Connection {
  
  /**
   * @param {Function} callback
   * @returns {Promise<any> | Promise}
   */
  beginTransaction = (callback) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        query => callback(query),
        error => reject(error),
        () => resolve('Transação realizada com sucesso.')
      );
    });
  };
}