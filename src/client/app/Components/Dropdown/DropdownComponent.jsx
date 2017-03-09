import React, { Component } from 'react';


let DropdownComponent = function(props) {
  return (
    <div className="dropdown">
      <a href="#" className="btn btn-link dropdown-toggle" tabIndex="0">
        { props.title } <i className="icon-caret"></i>
      </a>
      <ul className="menu">
        { props.children }
      </ul>
    </div>
  );
}

export default DropdownComponent;