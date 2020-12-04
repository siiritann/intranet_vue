import * as axios from 'axios';
const BASE_URL = 'http://localhost:8080';

function upload(formData) {
    //const url = `${BASE_URL}/photos/upload`;
    const url = `${BASE_URL}/user/image/post/1`;

    const headers = {
        'Content-Type': 'application/json'
    }
    
    return axios.post(url, formData, {
        headers
        })// get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.id}` })));
}

export { upload }