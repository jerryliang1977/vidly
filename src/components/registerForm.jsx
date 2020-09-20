import React from 'react';
import Joi from 'joi-browser';
import Form from "./common/form";
import { register } from './../services/userServices';

class Register extends Form {
    state = { 
        data:{
        email:"",
        password: "",
        username: ""},
        errors: {}
     }
     schema = {
         email: Joi.string().email().required().label('Email'),
         password: Joi.string().min(5).required().label('Password'),
         username: Joi.string().required().label('Username')
     }
     doSubmit = async ()=>{
         try{
             const {headers} = await register(this.state.data);
             localStorage.setItem('token', headers["x-auth-token"]);
             window.location = '/';
         }catch(ex)
         {
             if(ex.response&&ex.response.status===400) {
                 const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
             }
         }
     }
    render() { 
        return ( 
            <form onSubmit = {this.handleSubmit} style = {this.styles}>
                <h1>Register</h1>
                {this.renderInput('email', 'Email')}
                {this.renderInput('password', 'Password')}
                {this.renderInput('username', 'Username')}
                {this.renderButton('Register')}
            </form>
         );
    }
}
 
export default Register;