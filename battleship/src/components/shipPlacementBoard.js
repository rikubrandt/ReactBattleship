import React from 'react';
import Row from './row'
import Cell from './placementCell'


class Board extends React.Component {

    handleDrop = (size, name, location) => {
        this.props.handleDrop(size, name, location)
    }


    checkIfSquareHasShip = (square) => {
        return this.props.placedShips.includes(square)
    }

    squareBackground = (square) => {
        if(this.props.enemyShooting.includes(square) &&this.checkIfSquareHasShip(square)) {
            return '#FF0000'
        }else if(this.props.enemyShooting.includes(square)) {
            return '#FFFACD'
        }
        else if(this.checkIfSquareHasShip(square)) {
            return '#000000'
        } else {
            return '#FFFFFF'
        }
    }

    render() {
        let matrix = [], row;
        for(let r=0; r<this.props.rows; r++) {
            row=[]
            for(let c=0; c<this.props.columns;c++) {
                row.push(`${r}${c}`);
            }
            matrix.push(row)
        }
        return(
            <div className="board">
                {matrix.map((row, ri) => (
                    <Row key={ri}>
                        {row.map(cellId => <Cell ship={this.squareBackground(cellId)} key={cellId} handleHover={this.handleHover} handleDrop={this.handleDrop} id={cellId}/>)}
                    </Row>
                ))}
            </div>
        )
    }
}

export default Board