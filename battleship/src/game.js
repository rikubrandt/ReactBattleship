import React from 'react';
import Gameform from './gameform'
import Gameplay from './gameplay'
import shipSizes from './shipSizes';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player1: '',
            player2: '',
            total: 0,
            ships: {
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
        console.log(field, value)
        let newShips = this.state.ships
        newShips[field] = parseInt(value)
        this.setState({ships: newShips})
    }
    onSubmit = (event) => {
        event.preventDefault()

        this.setState( {
            player1: event.target.player1.value,
            player2: event.target.player2.value,
            gameGridSize: event.target.gameGridSize.value,
        })
        if(this.state.player1.length<1 || this.state.player2.length <1) {
            alert("Please add player names.")
        }else if(this.calculateTotalNumberOfBoatSquares(this.state.ships)>this.state.gameGridSize*this.state.gameGridSize) {
            alert("The sea is too crowded, go with less ships or expand the sea!")
        } else {
            this.setState({gameSetup: true})
        }

    }
    

     calculateTotalNumberOfBoatSquares = (ships) => {
        return Object.keys(ships).reduce(function (total, key) {
            return total + ships[key] * shipSizes[key]
        }, 0)
    }
    render() {
        const {gameSetup, ships} = this.state
        if(!gameSetup) {
            return(
                <div className="container">
                    <Gameform
                     ships={this.state.ships} 
                     onChange={this.onChange} 
                     onSubmit={this.onSubmit} gridSize={this.state.gameGridSize} onShipChange={this.onShipChange} />
                </div>
            )
        }else {
            return(
                <DndProvider backend={HTML5Backend} >
                <div className="container">
                    <Gameplay 
                    ships={ships}
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