/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import validate from 'validate.js'

export default function validation(fields, constraints) {
  return validate(fields, constraints, {
    fullMessages: false
  })
}