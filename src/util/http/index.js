/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import axios from 'axios';

const axiosHttp = axios.create({
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosHttp;