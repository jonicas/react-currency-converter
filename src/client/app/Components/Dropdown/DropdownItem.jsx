import React from 'react';


var DropdownItem = function(props) {
  return (
    <li className="menu-item"><a href={props.href}>{props.text}</a></li>
  );

}

export default DropdownItem;