import React from 'react';
import { ItemTypes } from '../utils'
import { useDrop } from 'react-dnd'
import '../index.css';

function Cell (props) {
    

    const handleDrop = (size, name, location) => {
        props.handleDrop(size, name, location)
    }


    const [{isOver}, drop] = useDrop(() => ({
      accept: ItemTypes.SHIP,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop,
        size: monitor.getItem,
      }),
      drop: monitor => {handleDrop(monitor.size, monitor.name, props.id)},
    }))


    const cellColor = () => {
      if(isOver && props.ship === '#000000') {
        return '#FF2D00'
      }else if(isOver) {
        return '#7CFC00'
      }else if(props.ship==='#000000') {
        return '#000000'
      }else {
        return '#FFFFFF'
      }
    }

      return (
        
        <div style={{background: cellColor()}} ref={drop} id={props.id} className="cell">
  
  
        </div>
  
      )
  
    
  
  }
  
  export default Cell;