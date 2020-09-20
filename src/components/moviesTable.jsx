import React from 'react';
import TableHeader from './tableHeader';
import * as config from './common/config';
import TableBody from './tableBody';

const MoviesTable =props=> {
    const { movies,onDelete, onLike, onSort, sortpath, onCheck, deletedmovies, deleteall, onDeleteAll, onDeleteMulti, user} = props;
        return ( 
            <table className="table table-striped">
                <TableHeader
                colums = {config.colums}
                onSort = {onSort}
                sortpath = {sortpath} 
                deletedmovies = {deletedmovies}
                onDeleteAll = {onDeleteAll}
                deleteall = {deleteall}
                onDeleteMulti = {onDeleteMulti}
                user = {user}
                /> 

                <TableBody
                movies = {movies}
                onDelete = {onDelete}
                onLike = {onLike}
                onCheck = {onCheck}
                deleteall = {deleteall}
                deletedmovies = {deletedmovies}
                user = {user}
                    />
            </table>
         );        
}
 
export default MoviesTable;
