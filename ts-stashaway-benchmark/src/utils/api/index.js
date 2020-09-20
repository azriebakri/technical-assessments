import axios from 'axios';

let api = axios.create({
    baseURL: '' //Define base url for the http calls
});

export async function callApi(method, path, data, type) {
    
    if (method === 'POST') {
      return await api
        .post(path, data)
        .then((response) => {
          return apiResponse(response);
        });
    } else if (method === 'GET') {
      return await api.get(path, data).then((response) => {
        return apiResponse(response);
      });
    }
}

const apiResponse = (response) => {
    if (response) {
        if (response.data) {
            return response.data;
        } else {
            return [];
        }
    }
};