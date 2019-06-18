/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import Connection from './Connection';

export default class ContactService extends Connection {
  
  /**
   * @param {Number} contactId
   * @param {Array} data
   * @returns {Promise<any> | Promise}
   */
  saveContact = (contactId, data) => {
    return new Promise((resolve, reject) => {
      this.beginTransaction(query => {
        let sql = `
          INSERT INTO contacts
            (user_id, name, phone, identifier)
          VALUES
            (?,?,?,?)
          `;
         
         if (contactId !== null) {
           sql = `
              UPDATE contacts SET
                user_id = ?, name = ?, phone = ?, identifier = ?
              WHERE
                contact_id = ?
           `;
           
           data.push(contactId);
         }
        
         query.executeSql(sql, data, (tx, results) => {
            return resolve({
              success: true,
              message: 'Contato adicionado com sucesso.',
              contact_id: results.insertId
            })
         });
        })
        .then(payload => resolve(payload))
        .catch(error => reject(error));
    });
  };
  
  /**
   * @param {Number} contactId
   * @returns {Promise<any> | Promise}
   */
  getContactById = (contactId) => {
    return new Promise((resolve, reject) => {
      this.beginTransaction(query => {
          const sql = `SELECT phone FROM contacts WHERE contact_id = ?`;
        
          query.executeSql(sql, [contactId], (tx, results) => {
            const rows = results.rows;
            
            if (rows.length > 0) {
              return resolve({
                success: true,
                message: 'Registro encontrado',
                contact: rows.item(0)
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
  };
  
  /**
   * @param {Number} identifier
   * @returns {Promise<any> | Promise}
   */
  getPhoneByIdentifier = (identifier) => {
    return new Promise((resolve, reject) => {
      this.beginTransaction(query => {
          const sql = `SELECT phone FROM contacts WHERE identifier = ?`;
          
          query.executeSql(sql, [identifier], (tx, results) => {
            const rows = results.rows;
            
            if (rows.length > 0) {
              return resolve({
                success: true,
                message: 'Registro encontrado',
                contact: rows.item(0)
              });
            }
            
            if (results.rows.length === 0) {
              return reject({
                success: false,
                message: `O ramal ${identifier} não foi encontrado.`
              });
            }
          });
        })
        .then(payload => resolve(payload))
        .catch(error => reject(error));
    });
  };
  
  /**
   * @param {Number} userId
   * @returns {Promise<any> | Promise}
   */
  getContacts = (userId) => {
    return new Promise((resolve, reject) => {
      this.beginTransaction(query => {
          const sql = `SELECT * FROM contacts WHERE user_id = ? ORDER BY name ASC`;
          
          query.executeSql(sql, [userId], (tx, results) => {
            const rows = results.rows;
            let contacts = [];
  
            for (let i = 0; i < rows.length; i++) {
              contacts.push({
                ...rows.item(i),
              });
            }
            
            return resolve({
              success: true,
              contacts: contacts
            });
          });
        })
        .then(payload => resolve(payload))
        .catch(error => reject(error));
    });
  };
  
  /**
   * @param {Number} contactId
   * @returns {Promise<any> | Promise}
   */
  removeContact = (contactId) => {
    return new Promise((resolve, reject) => {
      this.beginTransaction(query => {
          const sql = `DELETE FROM contacts WHERE contact_id = ?`;
          
          query.executeSql(sql, [contactId], (tx, results) => {
            return resolve({
              success: true,
              message: 'Contato removido com sucesso.'
            })
          });
        })
        .then(payload => resolve(payload))
        .catch(error => reject(error));
    });
  }
}