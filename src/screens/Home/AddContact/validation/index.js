/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const constraints = {
  name: {
    presence: {
      allowEmpty: false,
      message: 'Informe o nome do contato'
    }
  },
  phone: {
    presence: {
      allowEmpty: false,
      message: 'Informe o telefone'
    }
  },
  digit: {
    presence: {
      allowEmpty: false,
      message: 'Informe o ramal para o número'
    }
  }
};

export default constraints;