import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://testre-6a510.firebaseio.com'
});

export default instance;