/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import Connection from './Connection';

export default class AuthenticationService extends Connection {
  
  /**
   * @param {String} email
   * @param {String} password
   * @returns {Promise<any> | Promise}
   */
  authenticate = (email, password): Promise => {
    return new Promise((resolve, reject) => {
      this.beginTransaction(query => {
          query.executeSql('SELECT * FROM users WHERE email = ?', [email], (tx, results) => {
            if (results.rows.length > 0) {
              const user = results.rows.item(0);
              
              if (user.password !== password) {
                return reject({
                  success: false,
                  message: 'Senha incorreta'
                });
              }
              
              return resolve({
                success: true,
                message: 'Registro encontrado',
                user: user
              });
            }
            
            if (results.rows.length === 0) {
              return reject({
                success: false,
                message: 'Registro não encontrado'
              });
            }
          });
        })
        .then(payload => resolve(payload))
        .catch(error => reject(error));
    });
  }
}