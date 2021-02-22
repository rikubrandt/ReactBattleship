import React from 'react';
import Gameform from './gameform'
import Gameplay from './gameplay'

class Game extends React.Component {
    constructor(props) {
        super()
        this.state = {
            player1: '',
            player2: '',
            gameGridSize: 5,
            gameSetup: false
        }
    }
    onChange = (field, value) => {
       this.setState({[field]: value})
    }
    onSubmit = (event) => {
        event.preventDefault()
        this.setState( {
            player1: event.target.player1,
            plaeyr2: event.target.player2,
            gameGridSize: event.target.gridSize.value,
            gameSetup: true
        })
        console.log("Submitted form")
    }

    render() {
        const {gameSetup} = this.state
        if(!gameSetup) {
            return(
                <div>
                    <h1>React Battleship</h1>
                    <Gameform onChange={this.onChange} onSubmit={this.onSubmit} />
                </div>
            )
        }else {
            return(
                <div>
                    <Gameplay rows={this.state.gameGridSize} columns={this.state.gameGridSize} />
                </div>
            )
        }
        
    }
}

export default Game