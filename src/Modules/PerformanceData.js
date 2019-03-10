import axios from 'axios'
import { storeAuthCredentials } from './Auth'

const apiUrl = 'https://vo-cooper-api.herokuapp.com/api/v1';

const saveData = (result, values) => {
  const headers = JSON.parse(sessionStorage.getItem(['credentials']));
	const path = apiUrl + '/performance_data';
	const { gender , distance, age } = values
  return new Promise((resolve, reject) => {
    axios.post(path, {
      performance_data: {
				data:
				{ message: result,
					gender: gender,
					distance: distance,
					 age: age }
			}
		},{
      headers: headers
    })
    .then(response => {
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