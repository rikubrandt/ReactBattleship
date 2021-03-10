import React from 'react';
import BattleBoard from './components/battleboard'
import InfoScene from './components/infoScene'
import MiddleScene from './components/middleScene';
import Ship from './components/ship'
import './index.css';
import ShipPlacementBoard from './components/shipPlacementBoard'
import ShipSizes from './shipSizes';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


class Gameplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerTurn: props.player1Name,
            showMiddleScene: false,
            infoSceneTitle: '',
            infoSceneDesc: 'Place your ships, by dragging it to the grid.',
            infoSceneMessage: '',
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

    incrementHits = (event) => {
        let shipHistory = null
        if (this.state.playerTurn === this.props.player1Name) {
            if (this.state.p2ShipPlacement.includes(event)) {
                this.setState({ p1hits: this.state.p1hits + 1, infoSceneMessage: 'HIT!' }, () => { this.checkWinner() })
            } else {
                this.setState({ infoSceneMessage: 'MISS!' })
            }
            shipHistory = this.state.p1ShootingHistory
            shipHistory.push(event)
            this.setState({ p1ShootingHistory: shipHistory, shot: true })
        }
        else {
            if (this.state.p1ShipPlacement.includes(event)) {
                this.setState({ p2hits: this.state.p2hits + 1, infoSceneMessage: 'HIT!' }, () => { this.checkWinner() })
            } else {
                this.setState({ infoSceneMessage: 'MISS!' })
            }
            shipHistory = this.state.p2ShootingHistory
            shipHistory.push(event)
            this.setState({ p2ShootingHistory: shipHistory, shot: true })
        }

    }

    gridShoot = (event) => {
        if (this.state.shot) {
            alert("You already shot, press continue")
            return null
        }
        console.log(this.state.playerTurn + " shot at number " + event)
        if (this.state.playerTurn === this.props.player1Name) {
            if (this.state.p1ShootingHistory.includes(event)) {
                alert("You already shot that square")
            } else {
                this.incrementHits(event)

            }

        } else {
            if (this.state.p2ShootingHistory.includes(event)) {
                alert("You already shot that square")
            } else {
                this.incrementHits(event)
            }
        }

    }

    shootingContinueButtonOnClick = () => {
        if(!this.state.shot) {
            alert("Shoot your shot!")
            return null
        }
        if (this.state.playerTurn === this.props.player1Name) {
            this.setState({ playerTurn: this.props.player2Name, showMiddleScene: true, shot: false, infoSceneMessage: '' })
        } else {
            this.setState({ playerTurn: this.props.player1Name, showMiddleScene: true, shot: false, infoSceneMessage: '' })
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
            this.setState({
                shipsSet: true,
                playerTurn: this.props.player1Name,
                showMiddleScene: true,
                infoSceneDesc: 'Shoot by clicking the square on the enemy grid.'
            })
        } else {
            alert("Place all your ships to the square.")
        }
    }
    checkWinner() {
        if (this.state.p1hits === this.props.shipSquares) {
            this.setState({ winner: this.state.player1Name, gameOver: true })
        }
        if (this.state.p2hits === this.props.shipSquares) {
            this.setState({ winner: this.state.player2Name, gameOver: true }, this.forceUpdate)
        }
    }


    render() {
        const { rows, columns, player1Name, player2Name } = this.props
        const { showMiddleScene, playerTurn, shipsSet, p1ShipPlacement, p2ShipPlacement, ships, gameOver, p1ShootingHistory, p2ShootingHistory, infoSceneDesc, infoSceneMessage } = this.state

        if (showMiddleScene === true) {
            return (
                <MiddleScene player={playerTurn} handleClick={this.middleSceneClick} />
            )
        }
        if (gameOver) {
            return (
                <div>
                    Winner {playerTurn}
                </div>
            )
        }
        else if (!shipsSet && playerTurn === player1Name) {
            const shipsComponents = this.initializeShips(ships)
            return (
                <div>
                    <InfoScene player={playerTurn} desc={infoSceneDesc} />
                    <div className="gamePlayContainer">
                        <div className="floatContainer">
                            <ShipPlacementBoard placedShips={p1ShipPlacement} rows={rows} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />
                            <Button variant="contained" color="secondary"size="small" onClick={this.resetShipPlacement.bind(this)}>Reset Ships</Button>
                            <Button variant="contained" color="primary" size="small" onClick={this.shipsSetButton.bind(this)}>Confirm ship placement</Button>
                        </div>
                        <div className="floatContainer">
                            <ul className="shipUl">
                                {shipsComponents.map((component, index) => (
                                    <li key={index}>
                                        {component}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
        else if (!shipsSet && playerTurn === player2Name) {
            const shipsComponents = this.initializeShips(ships)
            return (
                <div>
                    <InfoScene player={playerTurn} desc={infoSceneDesc} extra={infoSceneMessage} />
                    <div className="gamePlayContainer">
                        <div className="floatContainer">
                            <ShipPlacementBoard placedShips={p2ShipPlacement} rows={rows} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />
                            <Button variant="contained" color="secondary"size="small" onClick={this.resetShipPlacement.bind(this)}>Reset Ships</Button>
                            <Button variant="contained" color="primary" size="small" onClick={this.shipsSetButton.bind(this)}>Confirm ship placement</Button>
                        </div>
                        <div className="floatContainer">
                            <ul className="shipUl">
                                {shipsComponents.map((component, index) => (
                                    <li key={index}>
                                        {component}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else if (shipsSet && !gameOver) {

            if (showMiddleScene === true) {
                return (
                    <div className="gamePlayContainer">
                        <MiddleScene player={playerTurn} handleClick={this.middleSceneClick} />
                    </div>
                )
            }
            else if (playerTurn === player1Name) {
                return (
                    <div>
                        <InfoScene player={playerTurn} desc={infoSceneDesc} extra={infoSceneMessage} />
                        <div className="gamePlayContainer">
                            <div className="floatContainer">
                                <ShipPlacementBoard placedShips={p1ShipPlacement} rows={rows} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />

                            </div>

                            <Button variant="contained" size="small" color="primary" onClick={this.shootingContinueButtonOnClick.bind(this)}>Continue</Button>
                            <div className="floatContainer">
                                <BattleBoard
                                    enemyPlacement={p2ShipPlacement}
                                    shootingHistory={p1ShootingHistory}
                                    rows={rows}
                                    columns={columns}
                                    handleClick={this.gridShoot.bind(this)} />
                            </div>
                        </div>
                    </div>

                )
            } else {
                return (
                    <div>
                        <InfoScene player={playerTurn} desc={infoSceneDesc} extra={infoSceneMessage} />
                        <div className="gamePlayContainer">
                            <div className="floatContainer">
                                <BattleBoard
                                    enemyPlacement={p1ShipPlacement}
                                    shootingHistory={p2ShootingHistory}
                                    rows={rows}
                                    columns={columns}
                                    handleClick={this.gridShoot.bind(this)} />
                            </div>
                        <Button variant="contained" size="small" color="primary" onClick={this.shootingContinueButtonOnClick.bind(this)}>Continue</Button>
                        <div className="floatContainer">
                                <ShipPlacementBoard placedShips={p1ShipPlacement} rows={rows} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />

                            </div>
                        </div>
                        
                    </div>

                )

            }


        }
    }





}
export default Gameplay