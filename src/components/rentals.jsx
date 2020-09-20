import React from 'react';

const Rentals = props => {
    return ( 
        <div className="content">
            <h1>Rentals</h1>
            <button onClick = {()=>props.history.push('/movies')} className = 'btn btn-primary'>return</button>
        </div>
     );
}
 
export default Rentals;