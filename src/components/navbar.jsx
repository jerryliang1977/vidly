import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
    const {user} = props;
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">Vidly</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-item nav-link" to ="/movies">Movies</Link>
                <Link className="nav-item nav-link" to ="/customers">Customers</Link>
                <Link className = 'nav-item nav-link' to='rentals'>Rentals</Link>
                {user&&
                <React.Fragment>
                <Link className="nav-item nav-link" to ="/profile">{user.name}</Link>
                <Link className="nav-item nav-link" to ="/logout">Logout</Link>
                </React.Fragment>}
                {(!user)&&
                <React.Fragment>
                <Link className="nav-item nav-link" to ="/login">Login</Link>
                <Link className="nav-item nav-link" to ="/register">Register</Link>
                </React.Fragment>}
            </div>
        </div>
        </nav>
     );
}
 
export default NavBar;