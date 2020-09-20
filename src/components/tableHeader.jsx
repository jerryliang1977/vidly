import React, { Component } from 'react';
class TableHeader extends Component {
    raiseSort = path=>{
        let sortpath = {...this.props.sortpath};
        let order = 'asc';
        if(path===sortpath.path) order= sortpath.order==='asc'?'desc':'asc';
        sortpath = {path, order};
         this.props.onSort(sortpath);
    }
    renderSortIcon=colum=>{
        const {sortpath} = this.props;
        if(colum.path!==sortpath.path) return null;
        if(sortpath.order==='asc') return <i className="fa fa-sort-asc"></i>;
        return <i className="fa fa-sort-desc"></i>;
    }
    renderCheckbox = ()=>{
        return <div><input 
        onChange = {this.props.onDeleteAll} 
        checked = {this.props.deleteall}
        type = 'checkbox'/>{(this.props.deletedmovies.length!==0)
            &&<i onClick = {this.props.onDeleteMulti} className="fa fa-trash btn"></i>}</div>;
    }
    render() { 
        const {user} = this.props;
        return ( 
            <thead className = 'bg-primary ' style = {{color: 'white'}}>
                {(user&&user.isAdmin)&&<tr className = "bg-light"><th colSpan = {this.props.colums.length}>{this.renderCheckbox()}</th></tr>}
                <tr>
                    {this.props.colums.map(
                        colum => <th 
                        style = {{cursor:"pointer"}} 
                        onClick ={()=>this.raiseSort(colum.path)}
                        key = {colum.path||colum.key} 
                        scope = 'col'>{colum.label}
                        {this.renderSortIcon(colum)}
                        </th>)}
                </tr>
            </thead>
         );
    }
}
 
export default TableHeader;