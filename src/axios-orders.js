import axios from 'axios';
const instance = axios.create({
    baseURL : 'https://burger-firebase.firebaseio.com/'
});

export default instance;