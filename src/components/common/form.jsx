import React, {Component} from 'react';
import Input from './input';
import Joi from 'joi-browser';
import GroupSelect from './groupselect';

class Form extends Component {
    state = {  }
    styles = {
        maxWidth: "400px", 
        margin: "auto"};
    validate = ()=>{
        const data = {...this.state.data};
        const option = {abortEarly: false};
        const {error} = Joi.validate(data, this.schema, option);
        if(error)
        return error.details
                .map(e=> ({[e.path[0]]:e.message}))
                .reduce((obj, e)=> ({...obj, ...e}));
        else
            return null;
    }
    handleSubmit= e=>{
        e.preventDefault();
        const result = this.validate();
        const errors = !result?{}:result;
        this.setState({errors}); 
        if (Object.keys(errors).length!==0) return;
        this.doSubmit();
    }
    validateProperty = input=> {
        const {name, value} = input;
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error? error.details[0].message : null;
    }
    handleChange = ({currentTarget: input})=>{
        const errors = {...this.state.errors};
        const {name} = input;
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[name] = errorMessage
        else delete errors[name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    }
    renderButton = label=>{
        return <button 
            disabled = {this.validate()} 
            className="btn btn-primary">{label}</button>
    }
    renderInput =(name, label, type = 'text', readonly = false)=>{
        const {data, errors} = this.state;
        return <Input 
        type = {type}
        name = {name}
        value = {data[name]}
        label = {label}
        onChange = {this.handleChange}
        error = {errors[name]}
        readOnly = {readonly}
        />
    }
    renderGroupSelect = (items, name, label, disabled) =>{
        return <GroupSelect 
        items = {items}
        name = {name}
        label = {label}
        value = {this.state.data[name]}
        error= {this.state.errors[name]}
        onChange = {this.handleChange}
        disabled = {disabled}
        />
    }
}
 
export default Form;