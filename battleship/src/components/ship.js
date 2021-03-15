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
      const rotate = props.rotate
      const styles = {
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }
      const size = props.size
      const blocks = []

      if(rotate===true) {
        for(let i=0;i<size;i++) {
          blocks.push(
            <div className="divTableRow" key={i}>
          <ShipBlock rotate={rotate} index={i} key={i}/>
          </div>
          )
        }
        return(
          <div className="divTable" ref={drag}
          style={styles}>
              <div className="divTableBody" >
                    {blocks}
              </div>
          </div>
        )
      } else {
        for(let i=0;i<size;i++) {
          blocks.push(<ShipBlock index={i} key={i}/>)
        }
        return (
          <div
          className="shipContainer"
            ref={drag}
            style={styles}>
              {blocks}
          </div>
        )
      }

        
    }

const ShipBlock = (props) => {
  const divName = props.rotate ? 'divTableCell' : 'shipDiv'
  return(
    <div className={divName}></div>
  )
}



export default Ship