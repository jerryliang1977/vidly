import React, {Component} from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/navbar';
import Movies from './components/movies';
import Customers from './components/customer';
import Rentals from './components/rentals';
import notFound from './components/notfound';
import MovieForm from './components/movieform';
import LoginForm from './components/loginform';
import Register from './components/registerForm';
import Logout from './components/logout';
import { getCurrentUser } from './services/authServices';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();
    this.setState({user});
  }
  render(){
    const {user} = this.state;
  return (
    <div className = 'container'>
        <ToastContainer />
        <NavBar user = {user}/>
      <div className = 'content'>
        <Switch>
          <Route path = '/login' component = {LoginForm} />
          <Route path = '/logout' component = {Logout} />
          <Route path = '/register' component = {Register} />
          <Route path = '/customers' component = {Customers} />
          <Route path = '/rentals' component = {Rentals} />
          {/* <Route path = '/movies/new' render = {props =>
            {if(!user) return <Redirect to ='/login' />
            return <MovieForm {...props} />
          }
          } /> */}
          <ProtectedRoute path = '/movies/new' component = {MovieForm}/>
          <Route path = '/movies/:movieid' render = {props => <MovieForm {...props} user = {user} />} />
          <Route path = '/movies' render = {props=><Movies {...props} user= {user} />} />
          <Route path = '/' exact render = {props=><Movies {...props} user= {user} />} />
          <Route path = '/notfound' component = {notFound} />
          <Redirect to ='/notfound' />
        </Switch>
      </div>
      
    </div>
  );
  }
}

export default App;
