import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.sunrise-sunset.org/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});
