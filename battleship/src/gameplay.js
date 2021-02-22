import React from 'react';
import Board from './components/board'
import './App.css';
class Gameplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {rows, columns} = this.props
        return(
            <div>
                <Board rows={rows} columns={columns} />
            </div>

        )
    }

}
export default Gameplay