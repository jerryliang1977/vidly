import React, { Component } from 'react';
import _ from 'lodash';
import Like from './common/likeComponent';
import * as config from './common/config';
import { Link } from 'react-router-dom';

class TableBody extends Component {
    user = this.props.user;
    extraColums1 = {
        key: 'Checkbox',
        content: movie => this.user&&this.user.isAdmin?
        <input 
        value = {movie._id}
        onChange = {this.props.onCheck} 
        type = 'checkbox' 
        checked = {this.props.deletedmovies.includes(movie._id)?true:false}/>
        : null
    }
    extraColums = [
        {key: 'Like', 
        content: movie=> 
        <Like onClick = {this.props.onLike} 
        movie = {movie}/>},
        {key: 'Delete', 
        content: movie=> this.user&&this.user.isAdmin?
        <button 
        onClick = {()=>this.props.onDelete(movie._id)} 
        className = 'btn btn-danger'>Delete</button>
        :null}
    ];
    colums = [{...this.extraColums1},
        ...config.colums
        .filter(c=>c.path),
        ...this.extraColums];
    
    renderCell=(movie, colum)=>{
        if(colum.path) {
            if(colum.path === 'title') {
                const linkto = '/movies/'+movie._id;
                return <Link to = {linkto}>{movie.title}</Link>}
            return _.get(movie, colum.path)};
        if(colum.content) {
            return colum.content(movie)};

    }

    render() { 
        const {movies} = this.props;
        return ( 
            <tbody>
                {movies.map(movie =>
                    <tr key = {movie._id}> 
                        {this.colums.map(colum=>
                            <td key = {movie._id+(colum.path||colum.key)}>{this.renderCell(movie, colum)}</td>
                            )}
                    </tr>)}
            </tbody>
         );
    }
}
 
export default TableBody;