import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-c8226.firebaseio.com' 
});

export default instance;