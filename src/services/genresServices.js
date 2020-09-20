import http from './httpServices';
import config from '../config/config.json';

export default function getGenres() {
    return http.get(config.apiEndpoint+'genres');
}
