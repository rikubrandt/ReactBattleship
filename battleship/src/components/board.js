import React from 'react';
import Square from './square'
import Row from './row'
import Cell from './cell'


class Board extends React.Component {
    constructor(props) {
        super(props)
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
            <div className="grid">
                {matrix.map((row, ri) => (
                    <Row key={ri}>
                        {row.map(cellId => <Cell key={cellId} id={cellId}/>)}
                    </Row>
                ))}
            </div>
        )
    }
}

export default Board