import React from 'react';

const notFound = props => {
    return ( 
        <div className="content">
            <h1>Not Found</h1>
            <button onClick ={()=> props.history.push('/movies')} className="btn btn-primary">Return</button>
        </div>
     );
}
 
export default notFound;