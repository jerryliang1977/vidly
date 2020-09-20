import React from 'react';

const GroupSelect = ({items, label, error, onChange, disabled, ...rest}) => {
    return ( 
        
        <div className="form-group">
        <label htmlFor="inputGroupSelect">{label}</label>
        <select 
        className="custom-select" 
        id="inputGroupSelect"
        onChange = {onChange}
        disabled = {disabled}
        {...rest}>
            <option value=''>Choose...</option>
            {items.map(item=> <option
            key = {item._id}
            value = {item._id}
            >{item.name}</option>)}
        </select>
        {error&& <div className="alert alert-danger">{error}</div> }
        </div>        
     );
}
 
export default GroupSelect;