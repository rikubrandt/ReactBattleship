import React from 'react';
import Row from './row'
import Cell from './cell'


class Board extends React.Component {

    handleClick = (event) => {
        this.props.handleClick(event)
    }

    squareBackgroud = (square) => {
        if(this.props.shootingHistory.includes(square) &&this.props.enemyPlacement.includes(square)) {
            return '#FF0000'
        }else if(this.props.shootingHistory.includes(square)) {
            return '#FFFACD'
        }
        else {
            return '#fff'
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
                        {row.map(cellId => <Cell key={cellId} background={this.squareBackgroud(cellId)} handleClick={this.handleClick} id={cellId}/>)}
                    </Row>
                ))}
            </div>
        )
    }
}

export default Board