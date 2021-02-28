import React from 'react';
import { ItemTypes } from '../utils'
import { useDrop } from 'react-dnd'
import '../index.css';

function Cell (props) {
    
    const handleDrop = (size, name, location) => {
        props.handleDrop(size, name, location)
    }
    const [collectedProps, drop] = useDrop(() => ({
      accept: ItemTypes.SHIP,
      collect: (monitor) => ({
        isOver: !!monitor.isOver,
        canDrop: !!monitor.canDrop,
        size: monitor.getItem
      }),
      drop: monitor => {handleDrop(monitor.size, monitor.name, props.id)}
    }))

      return (
  
        <div style={{background: props.ship ? '#000' : '#fff' }} ref={drop} id={props.id} className="cell">
  
          {props.id}
  
        </div>
  
      )
  
    
  
  }
  
  export default Cell;