import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import { deleteMovie, getMovies } from '../services/moviesServices';
import getGenres from '../services/genresServices';
import Pagination from './common/pagination';
import ListGenres from './common/listGenres';
import * as config from './common/config';
import MoviesTable from './moviesTable';
import SearchBox from './common/searchbox';

class Movies extends Component {
    state = { movies:[],
            genres: [],
            selectedgenre:{name: "All Genres" },
            currentpage: 1,
            sortpath: {path: 'title', order: 'asc'},
            searchQuery: '',
            deletedMovies: [],
            deleteall: false,};
            

    async componentDidMount(){
        const {data: movies} = await getMovies();
        const {data} = await getGenres();
        this.setState({movies, genres: [{_id: '', name: 'All Genres'},...data]});
    }
    handleDelete = async movieid=>{
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(movie => movie._id!== movieid);
        this.setState({movies});
        try{

            await deleteMovie(movieid);
        }catch(ex)
        {
            if(ex.response&&ex.response.status===404) alert('The movie has been deleted');
            this.setState({movies: originalMovies});
        }
    }
    handleLike = movie =>{
        const currentMovie ={...movie, isLike: !movie.isLike};
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...currentMovie};
        this.setState({movies});
    }
    handlePageChang = currentpage=>{
        this.setState({currentpage});
    }
    paginate=(movies,currentpage)=>{
        const sindex = config.movieNumOfPage*(currentpage-1);
        return movies.slice(sindex, sindex+config.movieNumOfPage);
     
    }
    handleGenreChange = genre=>{
        this.setState({selectedgenre: genre, searchQuery: "", currentpage: 1, sortpath: {path: 'title', order: 'asc'}});
    }
    filterMovie=()=>{
        const {movies: filteringmovies, selectedgenre: genre, sortpath} = this.state;
        const {path, order} = sortpath;
        const {searchQuery} = this.state;
        const filtered = searchQuery? 
        filteringmovies.filter(movie => 
            movie.title.toLowerCase()
            .includes(searchQuery.toLowerCase())) : filteringmovies;
        
        if(!genre._id) return _.orderBy(filtered,[path],[order])
        
        return _.orderBy(
            filtered
            .filter(movie => movie.genre._id === genre._id ),
            [path],
            [order]);
    }
    handleSort=sortpath=>{
        this.setState({sortpath})
    }

    getPageCount= data=>{
        return data.length%config.movieNumOfPage!==0? 
        Math.trunc(data.length/config.movieNumOfPage) + 1 
        :data.length/config.movieNumOfPage ;
    }
    handleMovieSelected=movieid=>{
        this.props.history.push('/movies/' + movieid);
    }
    handleSearch = query=>{
        this.setState({searchQuery: query, selectedgenre: {name: "All Genres" }, currentpage: 1});

    }
    handleCheck = ({currentTarget})=>{
        let deletedMovies = [...this.state.deletedMovies];
        if(currentTarget.checked) {
            deletedMovies.push(currentTarget.value);
        }else {
               deletedMovies = deletedMovies.filter(m=>m !== currentTarget.value);
               this.setState({deleteall: false})
        }
        this.setState({deletedMovies});
    }
    handelDeleteAll= async ({currentTarget})=>{
        let deletedMovies = [];
        const deleteall = currentTarget.checked;
        const {data} = await getMovies();
        if(deleteall) deletedMovies = data.map(m => m._id)
        this.setState({deleteall, deletedMovies});
    }
    handleDeleteMulti = ()=>{
        let movies = [...this.state.movies];
        const deletedMovies = [...this.state.deletedMovies];
        movies = movies.filter(m =>!deletedMovies.includes(m._id));
        this.setState({movies, deletedMovies: []});

    }
    render() { 
        const {movies: allMovies, currentpage, genres, selectedgenre, sortpath, searchQuery, deletedMovies, deleteall} = this.state;
        const filteredMovies = this.filterMovie(allMovies, selectedgenre, sortpath);
        const totalPage = this.getPageCount(filteredMovies);
        const itemCount = filteredMovies.length;
        const movies = this.paginate(filteredMovies,currentpage);
        const {user} = this.props;
        return ( 
                <div className="row">
                <div className="col-2 my-3">
                    <ListGenres 
                    genres = {genres}
                    selectedgenre = {selectedgenre}
                    onClick = {this.handleGenreChange}
                    />
                </div>

                <div className="col">
                    {user&&<Link to = '/movies/new' className = 'btn btn-primary' style = {{marginTop: '20px', marginBottom: '20px'}}>New Movie</Link>}
                    {itemCount===0?<p>There are no movies in database</p>:<p>Showing {itemCount} movie(s) in database</p>}
                    <SearchBox 
                    value = {searchQuery}
                    onChange = {this.handleSearch}/>
                    {(itemCount!==0)&&<MoviesTable 
                    itemcount = {itemCount}
                    movies = {movies}
                    onDelete = {this.handleDelete}
                    onLike = {this.handleLike}
                    onSort = {this.handleSort}
                    sortpath = {sortpath}
                    onCheck = {this.handleCheck}
                    deletedmovies = {deletedMovies}
                    onDeleteAll = {this.handelDeleteAll}
                    deleteall = {deleteall}
                    onDeleteMulti = {this.handleDeleteMulti}
                    user = {user}
                    />}
               
                    {(itemCount!==0)&&<Pagination 
                    pagecount = {totalPage}
                    currentpage = {currentpage}
                    onClick = {this.handlePageChang}
                    />}
                </div>
                </div>
         );
    }
}

export default Movies;