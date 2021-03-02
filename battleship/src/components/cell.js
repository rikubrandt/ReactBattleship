import React from 'react';
import '../index.css';

function Cell (props) {
    
    const handleClick = (event) => {
      props.handleClick(props.id)
    }
      return (
  
        <div onClick={handleClick} id={props.id} className="cell">
  
          {props.id}
  
        </div>
  
      )
  
    
  
  }
  
  export default Cell;