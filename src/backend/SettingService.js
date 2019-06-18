/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import Connection from './Connection';

export default class SettingService extends Connection {
  
  /**
   * @param {Array} data
   * @returns {Promise<any> | Promise}
   */
  changeAccount = (data): Promise => {
    return new Promise((resolve, reject) => {
      this.beginTransaction(query => {
          const sql = `
            UPDATE users SET
              name = ?, email = ?, password = ?
            WHERE
              user_id = ?
         `;
          
          query.executeSql(sql, data, (tx, results) => {
            return resolve({
              success: true,
              message: 'Configurações atualizadas com sucesso.'
            })
          });
        })
        .then(payload => resolve(payload))
        .catch(error => reject(error));
    });
  };
}