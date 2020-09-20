import React from 'react';
const Like = ({movie,onClick}) => {
    
    return ( 
        <React.Fragment>
            <i onClick = {()=>onClick(movie)} className={movie.isLike?"fa fa-heart btn":"fa fa-heart-o btn"}></i>
        </React.Fragment>
     );
}
 
export default Like;