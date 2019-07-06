/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import validate from 'validate.js'

/**
 * @param {Object} fields
 * @param {Object} constraints
 * @returns {any}
 */
export default function validation(fields, constraints) {
  return validate(fields, constraints, {
    fullMessages: false
  })
}