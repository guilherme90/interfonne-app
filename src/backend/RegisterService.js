/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import Connection from './Connection';

export default class RegisterService extends Connection {
  /**
   * @param {String} name
   * @param {String] email
   * @param {String} password
   * @returns {Promise<any> | Promise}
   */
  register = (name, email, password) => {
    return new Promise((reject, resolve) => {
      this.beginTransaction(query => {
        const data = [
          name,
          email,
          password
        ];
        
        query.executeSql('INSERT INTO users (name, email, password) VALUES(?,?,?)', data, (tx, results) => {
        
        });
      })
      .then(payload => resolve(payload))
      .catch(error => reject(error));
    });
  }
}