import React, { Component } from 'react';

class SearchBox extends Component {
    render() { 
        const {value, onChange} = this.props;
        return ( 
            <input 
            type="text" 
            value = {value}
            onChange = {e=>onChange(e.currentTarget.value)}
            placeholder = 'Search...'
            className="form-control my-3"/>
         );
    }
}
 
export default SearchBox;