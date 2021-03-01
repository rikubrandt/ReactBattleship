import React from 'react';
import Gameform from './gameform'
import Gameplay from './gameplay'
import shipSizes from './shipSizes';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            player1: '',
            player2: '',
            total: 0,
            boats: {
            carrier: 0,
            battleship: 0,
            cruiser: 0,
            submarine: 0,
            destroyer: 0,
            },
            gameGridSize: 5,
            gameSetup: false
        }
    }
    onChange = (field, value) => {
       this.setState({[field]: value})
    }
    onShipChange = (field, value) => {
        let newBoat = this.state.boats
        newBoat[field] = parseInt(value)
        this.setState({boats: newBoat})
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
            gameGridSize: event.target.gameGridSize.value,
        })
        if(this.state.player1.length<1 || this.state.player2.length <1) {
            alert("Please add player names.")
        }else if(this.calculateTotalNumberOfBoatSquares(this.state.boats)>this.state.gameGridSize*this.state.gameGridSize) {
            alert("The sea is too crowded, go with less ships or expand the sea!")
        } else {
            this.setState({gameSetup: true})
        }

    }
    

     calculateTotalNumberOfBoatSquares = (boats) => {
        return Object.keys(boats).reduce(function (total, key) {
            return total + boats[key] * shipSizes[key]
        }, 0)
    }


    render() {
        const {gameSetup} = this.state
        if(!gameSetup) {
            return(
                <div className="container">
                    <Gameform onChange={this.onChange} onSubmit={this.onSubmit} gridSize={this.state.gameGridSize} onShipChange={this.onShipChange} />
                </div>
            )
        }else {
            return(
                <DndProvider backend={HTML5Backend} >
                <div className="container">
                    <Gameplay 
                    boats={this.state.boats}
                     rows={this.state.gameGridSize}
                      columns={this.state.gameGridSize}
                       player1Name={this.state.player1}
                        player2Name={this.state.player2} />
                </div>
                </DndProvider>
            )
        }
        
    }
}




export default Game