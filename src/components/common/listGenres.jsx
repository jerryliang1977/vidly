import React from 'react';

const ListGenres = props=>{
    const {genres, selectedgenre, onClick} = props;
    return(
        <ul className="list-group">
            {genres.map(genre=> 
            <li 
            key = {genre._id}
            onClick = {()=>onClick(genre)} 
            style ={{cursor: 'pointer'}}
            className ={genre._id===selectedgenre._id? 
            'list-group-item active': 'list-group-item'}>{genre.name}</li>)}
        </ul>
    )
}

export default ListGenres;