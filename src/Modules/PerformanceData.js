import axios from 'axios'
import { storeAuthCredentials } from './Auth'

const apiUrl = 'http://localhost:3000/api/v1';

const saveData = (result) => {
  const headers = JSON.parse(sessionStorage.getItem(['credentials']));
  const path = apiUrl + '/performance_data';
  return new Promise((resolve, reject) => {
    axios.post(path, {
      performance_data: { data: { message: result }}
    }, {
      headers: headers
    })
    .then(response => {
      storeAuthCredentials(response);
      resolve(response.data.message);
    });
  });
};

const getData = () => {
  const headers = JSON.parse(sessionStorage.getItem(['credentials']));
  const path = apiUrl + '/performance_data';
  return new Promise((resolve, reject) => {
    axios.get(path, {
      headers: headers
    })
    .then(response => {
      storeAuthCredentials(response);
      resolve(response);
    });
  });
};

export { getData, saveData }