import React from 'react';
import { useDrag } from 'react-dnd'
import {ItemTypes} from '../utils'
import '../game.css';


function Ship (props) {
    const [{isDragging}, drag] = useDrag(() => ({
        item: { type: ItemTypes.SHIP, size: props.size, name: props.name},
        collect: monitor => ({
            item: monitor.getItem(),
            isDragging: !!monitor.isDragging(),
        }),
      }))
      const size = props.size
      const blocks = []
      for(let i=0;i<size;i++) {
        blocks.push(<ShipBlock key={i}/>)
      }
      return (
        
        <div
        className="shipContainer"
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
          }}>
            {blocks}
        </div>
      )
    }

const ShipBlock = () => {
  return(
    <div className="shipDiv"></div>
  )
}

export default Ship