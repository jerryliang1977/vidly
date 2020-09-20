import http from './httpServices';
import config from '../config/config.json';

export function register(user) {
    return http.post(config.apiEndpoint + 'users', 
    {
        email: user.email,
        password: user.password,
        name: user.username
    });
}