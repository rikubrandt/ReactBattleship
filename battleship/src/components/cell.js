import React from 'react';
import '../index.css';

function Cell (props) {
    
    const handleClick = () => {
      props.handleClick(props.id)
    }
      return (
  
        <div onClick={handleClick} id={props.id} className="cell" style={{background: props.background}}>
  
          {props.id}
  
        </div>
  
      )
  
    
  
  }
  
  export default Cell;