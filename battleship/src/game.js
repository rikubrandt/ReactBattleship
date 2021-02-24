import React from 'react';
import Gameform from './gameform'
import Gameplay from './gameplay'

class Game extends React.Component {
    constructor(props) {
        super()
        this.state = {
            player1: '',
            player2: '',
            carrier: 0,
            battleship: 0,
            cruiser: 0,
            submarine: 0,
            destroyer: 0,
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
            player1: event.target.player1.value,
            player2: event.target.player2.value,
            carrier: event.target.carrier.value,
            battleship: event.target.battleship.value,
            cruiser: event.target.cruiser.value,
            submarine: event.target.submarine.value,
            destroyer: event.target.destroyer.value,
            gameGridSize: event.target.gridSize.value,
        })
        if(this.state.player1.length<1 || this.state.player2.length <1) {
            alert("Please add player names.")
        } else {
            this.setState({gameSetup: true})
        }

    }

    render() {
        const {gameSetup} = this.state
        if(!gameSetup) {
            return(
                <div className="container">
                    <Gameform onChange={this.onChange} onSubmit={this.onSubmit} gridSize={this.state.gameGridSize} />
                </div>
            )
        }else {
            return(
                <div className="container">
                    <Gameplay rows={this.state.gameGridSize} columns={this.state.gameGridSize} player1Name={this.state.player1} player2Name={this.state.player2} />
                </div>
            )
        }
        
    }
}

export default Game