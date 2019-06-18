/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import Connection from './Connection';

export default class RegisterService extends Connection {
  
  /**
   * @param {String} name
   * @param {String} email
   * @param {String} password
   * @returns {Promise<any> | Promise}
   */
  register = (name, email, password): Promise => {
    return new Promise((resolve, reject) => {
      this.beginTransaction(query => {
        const data = [
          name,
          email,
          password
        ];
        
        query.executeSql('INSERT INTO users (name, email, password) VALUES(?,?,?)', data);
      })
      .then(payload => resolve(payload))
      .catch(error => reject(error));
    });
  }
}