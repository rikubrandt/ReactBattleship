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
            playerTurn: props.player1Name,
            showMiddleScene: false,
            infoSceneTitle: '',
            infoSceneDesc: '',
            shipsSet: false,
            gameOver: false,
            ships: Object.assign({}, this.props.ships),
            p1ShipPlacement: [],
            p2ShipPlacement: [],
            p1ShootingHistory: [],
            p2ShootingHistory: [],
            p1hits: 0,
            p2hits: 0,
            winner: '',
            shot: false
        }

    }


    shipDropHandler = (size, name, location) => {
        const gridSize = this.props.rows
        let shipPlacement = null
        if (this.state.playerTurn === this.props.player1Name) {
            shipPlacement = this.state.p1ShipPlacement
        } else {
            shipPlacement = this.state.p2ShipPlacement
        }

        var ok = false
        var row = location[0]
        var endSquare = parseInt(location[1]) + parseInt(size)
        if (endSquare > gridSize) {
            return null
        }

        for (var i = location[1]; i < endSquare; i++) {
            var square = "" + row + i
            if (this.checkIfSquareOccupied(square)) {
                ok = false
                break
            }
            shipPlacement.push(square)
            ok = true
        }
        if (ok) {
            if (this.state.playerTurn === this.props.player1Name) {
                this.setState({ p1ShipPlacement: shipPlacement })
            } else {
                this.setState({ p2ShipPlacement: shipPlacement })
            }

            this.updateShipState(name)

        }
    }

    updateShipState(name) {
        var newShips = Object.assign({}, this.state.ships)
        var value = newShips[name] - 1
        newShips[name] = value
        this.setState({ ships: newShips })
    }

    checkIfSquareOccupied = (square) => {
        if (this.state.playerTurn === this.props.player1Name) {
            return this.state.p1ShipPlacement.includes(square)
        } else {
            return this.state.p2ShipPlacement.includes(square)
        }
    }

    middleSceneClick = () => {
        this.setState({ showMiddleScene: false })
    }

    incrementHits = () => {
        if(this.state.playerTurn===this.props.player1Name) {
            this.setState({p1hits: this.state.p1hits +1}, () => {this.checkWinner()}) 
        }
        else {
            this.setState({p2hits: this.state.p2hits +1}, () => {this.checkWinner()}) 
        }
        
    }

    gridShoot = (event) => {
        if(this.state.shot) {
            alert("You already shot, press continue")
            return null
        }
        console.log(this.state.playerTurn + " shot at number " + event)
        let shipHistory = null
        if(this.state.playerTurn === this.props.player1Name) {
            if(this.state.p1ShootingHistory.includes(event)) {
                alert("You already shot that square")
            }else {
                if(this.state.p2ShipPlacement.includes(event)) {
                    this.incrementHits()
                }
            shipHistory = this.state.p1ShootingHistory
            shipHistory.push(event)
            this.setState({p1ShootingHistory: shipHistory, shot: true})
            }
            
        } else {
            if(this.state.p2ShootingHistory.includes(event)) {
                alert("You already shot that square")
            }else {
                if(this.state.p1ShipPlacement.includes(event)) {
                    this.incrementHits()
                }
                shipHistory = this.state.p2ShootingHistory
                shipHistory.push(event)
                this.setState({p2ShootingHistory: shipHistory, shot: true})
            }
        }
    
    }

    shootingContinueButtonOnClick = () => {
        if(this.state.playerTurn===this.props.player1Name) {
            this.setState({playerTurn: this.props.player2Name, showMiddleScene: true, shot: false})
        } else {
            this.setState({playerTurn: this.props.player1Name, showMiddleScene: true, shot: false})
        }
        
    }

    initializeShips(ships) {
        var shipComponents = []
        var uniqueKey = 0
        Object.keys(ships).map(function (key) {
            uniqueKey++
            const shipCount = ships[key]
            for (let i = 0; i < shipCount; i++) {
                shipComponents.push(<Ship name={key} key={uniqueKey} size={ShipSizes[key]} />)
                uniqueKey++
            }
            return null
        })
        return shipComponents
    }
    resetShipPlacement() {
        if (this.state.playerTurn === this.props.player1Name) {
            this.setState({ p1ShipPlacement: [] })
        } else {
            this.setState({ p2ShipPlacement: [] })
        }
        this.setState({ ships: this.props.ships });
    }
    shipsSetButton() {
        if (this.state.playerTurn === this.props.player1Name && this.state.p1ShipPlacement.length === this.props.shipSquares) {
            this.setState({ playerTurn: this.props.player2Name, showMiddleScene: true, ships: this.props.ships })
        } else if (this.state.playerTurn === this.props.player2Name && this.state.p2ShipPlacement.length === this.props.shipSquares) {
            this.setState({ shipsSet: true, playerTurn: this.props.player1Name, showMiddleScene: true })
        } else {
            alert("Place all your ships to the square.")
        }
    }
    checkWinner() {
        if(this.state.p1hits===this.props.shipSquares) {
            this.setState({winner: this.state.player1Name, gameOver: true})
        }
        if(this.state.p2hits===this.props.shipSquares) {
            this.setState({winner: this.state.player2Name, gameOver: true}, this.forceUpdate)
        }
    }


    render() {
        const { rows, columns, player1Name, player2Name } = this.props
        const { showMiddleScene, playerTurn, shipsSet, p1ShipPlacement, p2ShipPlacement, ships, gameOver, p1ShootingHistory, p2ShootingHistory, winner} = this.state

        if (showMiddleScene === true) {
            return (
                <MiddleScene player={playerTurn} handleClick={this.middleSceneClick} />
            )
        }
        if(gameOver) {
            return(
                <div>
                    Voittaja {playerTurn}
                </div>
            )
        }
        else if (!shipsSet && playerTurn === player1Name) {
            const shipsComponents = this.initializeShips(ships)
            return (
                <div>
                    <InfoScene player={playerTurn} desc="Place your ships " />
                    <ul className="shipUl">
                        {shipsComponents.map((component, index) => (
                            <li key={index}>
                                {component}
                            </li>
                        ))}
                    </ul>
                    <ShipPlacementBoard placedShips={p1ShipPlacement} rows={rows} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />
                    <button onClick={this.resetShipPlacement.bind(this)}>Reset Ships</button>
                    <button onClick={this.shipsSetButton.bind(this)}>Confirm ship placement</button>
                </div>
            )
        }
        else if (!shipsSet && playerTurn === player2Name) {
            const shipsComponents = this.initializeShips(ships)
            return (
                <div>
                    <InfoScene player={playerTurn} desc="Place your ships " />
                    <ul className="shipUl">
                        {shipsComponents.map((component, index) => (
                            <li key={index}>
                                {component}
                            </li>
                        ))}
                    </ul>
                    <ShipPlacementBoard placedShips={p2ShipPlacement} rows={rows} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />
                    <button onClick={this.resetShipPlacement.bind(this)}>Reset Ships</button>
                    <button onClick={this.shipsSetButton.bind(this)}>Confirm ship placement</button>
                </div>
            )
        } else if (shipsSet && !gameOver) {

                if (showMiddleScene === true) {
                    return (
                        <MiddleScene player={playerTurn} handleClick={this.middleSceneClick} />
                    )
                }
                else if (playerTurn === player1Name) {
                    return (
                        <div>
                            <InfoScene player={playerTurn} desc="Shoot by clicking the grid." />
                            <BattleBoard
                            enemyPlacement={p2ShipPlacement} 
                            shootingHistory={p1ShootingHistory}
                            rows={rows} 
                            columns={columns} 
                            handleClick={this.gridShoot.bind(this)} />
                            <button onClick={this.shootingContinueButtonOnClick.bind(this)}>Continue</button>
                        </div>

                    )
                } else {
                    return (
                        <div>
                            <InfoScene player={playerTurn} desc="Shoot by clicking the grid." />
                            <BattleBoard
                            enemyPlacement={p1ShipPlacement} 
                            shootingHistory={p2ShootingHistory}
                            rows={rows} 
                            columns={columns} 
                            handleClick={this.gridShoot.bind(this)} />
                            <button onClick={this.shootingContinueButtonOnClick.bind(this)}>Continue</button>
                        </div>

                    )

                }


            }
        }



    

}
export default Gameplay