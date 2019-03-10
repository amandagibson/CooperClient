import axios from 'axios'
import { storeAuthCredentials } from './Auth'

const apiUrl = 'https://vo-cooper-api.herokuapp.com/api/v1';

const saveData = (result, values) => {
  const headers = JSON.parse(sessionStorage.getItem(['credentials']));
	const path = apiUrl + '/bmi_data';
	const { weight , height } = values
  return new Promise((resolve, reject) => {
    axios.post(path, {
      bmi_data: {
				data:
				{ message: result,
					weight: weight,
					height: height,
			  }
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
  const path = apiUrl + '/bmi_data';
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