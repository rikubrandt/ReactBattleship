import React from 'react';
import BattleBoard from './components/battleboard'
import InfoScene from './components/infoScene'
import MiddleScene from './components/middleScene';
import Ship from './components/ship'
import './index.css';
import ShipPlacementBoard from './components/shipPlacementBoard'
import ShipSizes from './shipSizes';

class Gameplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerTurn: this.props.player1Name,
            showMiddleScene: false,
            infoSceneTitle: '',
            infoSceneDesc: '',
            shipsSet: false,
            gameOver: false,
            p1ShipPlacement: [

            ]

        }
    }

    shipDropHandler = (size, name, location) => {
        const gridSize = this.props.rows 
        console.log(size, name, location)
        let shipPlacement = this.state.p1ShipPlacement
        var ok = false
        //location "23"
        var row = location[0]
        var endSquare = parseInt(location[1])+parseInt(size)
        console.log(endSquare)
        if(endSquare>gridSize) {
            console.log("Ei mahdu")
            return null
        }

        for(var i=location[1];i<endSquare;i++) {
            var square =  ""+row+i
            if(this.checkIfSquareOccupied(square)) {
                console.log("Occupied")
                ok = false
                break
            }
            shipPlacement.push(square)
            ok = true
        }
        if(ok) {
        this.setState({p1ShipPlacement: shipPlacement})
        }
    }

    checkIfSquareOccupied = (square) => {
        return this.state.p1ShipPlacement.includes(square)
    }

    middleSceneClick = (event) => {
        if(this.state.playerTurn === this.props.player1Name) {
            this.setState({playerTurn: this.props.player2Name})
        } else {
            this.setState({playerTurn: this.props.player1Name})
        }
        this.setState({showMiddleScene: false})
    }

    gridShoot = (event) => {
        console.log("Grid number "+ event)
    }

    initializeShips(ships) {
        var shipComponents = []
        var uniqueKey = 0
        Object.keys(ships).map(function(key){
            uniqueKey++
            const shipCount = ships[key]
            for(let i=0;i<shipCount;i++) {
                shipComponents.push(<Ship key={uniqueKey} size={ShipSizes[key]}/>)
                uniqueKey++
                }
            return null
        })
        return shipComponents
    }

    render() {
        const {rows, columns, player1Name, player2Name, boats} = this.props
        const {showMiddleScene, playerTurn, shipsSet, p1ShipPlacement} = this.state

        const shipsComponents = this.initializeShips(boats)

        //Cutscene so for changing the active player.
        if(showMiddleScene===true) {
            return(
                <MiddleScene player={playerTurn} handleClick={this.middleSceneClick} />
            )
        }
        if(!shipsSet && playerTurn === player1Name) {
            return(
                <div>
                <InfoScene title="Place your ships " />
                <h1>Player: {this.props.player1Name}</h1>
                <BattleBoard rows={rows} columns={columns} handleClick={this.gridShoot.bind(this)}/>
                <ul className="shipUl">
                {shipsComponents.map((component, index) => (
                    <li key={index}>
                    {component}
                    </li>
                ))}
                </ul>
                <ShipPlacementBoard placedShips={p1ShipPlacement} rows={rows} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />
                
                </div>
            )
        }
        
    }

}
export default Gameplay