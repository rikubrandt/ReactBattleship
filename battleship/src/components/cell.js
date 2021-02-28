import React from 'react';
import { ItemTypes } from '../utils'
import { useDrop } from 'react-dnd'
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