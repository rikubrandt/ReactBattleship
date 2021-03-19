import React from 'react';
import '../styles/game.css';

function Cell (props) {
    
    const handleClick = () => {
      props.handleClick(props.id)
    }
      return (
  
        <div onClick={handleClick} id={props.id} className="cell" style={{background: props.background}}>
  
  
        </div>
  
      )
  
    
  
  }
  
  export default Cell;