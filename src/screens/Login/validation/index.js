/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

const constraints = {
  email: {
    presence: {
      allowEmpty: false,
      message: 'Informe seu e-mail'
    },
    email: {
      message: 'O e-mail informado está incorreto'
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: 'Informe sua senha'
    }
  }
};

export default constraints;