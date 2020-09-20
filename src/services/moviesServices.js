import http from './httpServices';
import config from '../config/config.json';

export const getMovies=  ()=>{
    return  http.get(config.apiEndpoint+'movies');
}
export const getMovie = movieid =>{
    return http.get(config.apiEndpoint+'movies/'+ movieid);
}
export const deleteMovie= movieid =>{
    return http.delete(config.apiEndpoint +'movies/'+ movieid);
}
export const saveMovie = movie=>{
    const movieid = movie._id;
    delete movie._id;
    if(movieid!=='') {
        return http.put(config.apiEndpoint+'movies/'+movieid, movie);
    }
    return http.post(config.apiEndpoint + 'movies', movie);

}