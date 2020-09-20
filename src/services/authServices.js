import http from './httpServices';
import config from '../config/config.json';
import jwtDecode from 'jwt-decode';

const tokenKey = 'token';
const apiEndpoint = config.apiEndpoint + 'auth';
export async function login(email, password) {
    const {data:jwt} = await http.post(apiEndpoint, {email, password});
    console.log(jwt);
    localStorage.setItem(tokenKey, jwt);
}
export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    }catch{}
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}
http.setJwt(getJwt());