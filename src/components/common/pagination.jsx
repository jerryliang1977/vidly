import React from 'react';
import PropTypes from 'prop-types';
const Pagination = ({pagecount,currentpage,onClick}) => {
    if (pagecount ===1) return null;
    const pages = [];
    for(let i = 0; i<pagecount; i++) pages.push(i+1);
    return (
        <nav aria-label="...">
        <ul className="pagination">
            {pages.map(p =><li 
            onClick = {()=>onClick(p)} 
            key = {p} 
            className = {p===currentpage?
            'page-item active':'page-item'}>
                <a className="page-link">{p}</a></li>)}
        </ul>
        </nav>
      );
}
Pagination.propTypes={
    pagecount: PropTypes.number.isRequired,
    currentpage: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}
export default Pagination;