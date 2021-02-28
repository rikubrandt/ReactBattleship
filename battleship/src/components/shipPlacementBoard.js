import React from 'react';
import Row from './row'
import Cell from './placementCell'


class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0
        }
    }

    handleDrop = (size, name, location) => {
        this.props.handleDrop(size, name, location)
    }

    checkIfSquareHasShip = (square) => {
        return this.props.placedShips.includes(square)
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
                        {row.map(cellId => <Cell ship={this.checkIfSquareHasShip(cellId)} key={cellId} handleDrop={this.handleDrop} id={cellId}/>)}
                    </Row>
                ))}
            </div>
        )
    }
}

export default Board