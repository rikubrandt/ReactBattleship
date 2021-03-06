import React from 'react';
import BattleBoard from './components/battleboard'
import InfoScene from './components/infoScene'
import MiddleScene from './components/middleScene';
import Ship from './components/ship'
import './styles/index.css';
import ShipPlacementBoard from './components/shipPlacementBoard'
import WinnerScreen from './components/winnerScreen'
import ShipSizes from './utils/shipSizes';
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
            shot: false,
            rotate: false
        }

    }


    shipDropHandler = (size, name, location) => {
        const gridSize = this.props.rows
        let shipPlacement = null
        if (this.state.rotate) {
            this.shipVerticalDrop(size, name, location)
        } else {
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
    }

    shipVerticalDrop(size, name, location) {
        const gridSize = this.props.rows
        let shipPlacement = null
        if (this.state.playerTurn === this.props.player1Name) {
            shipPlacement = this.state.p1ShipPlacement
        } else {
            shipPlacement = this.state.p2ShipPlacement
        }

        var ok = false
        var row = location[1]
        var endSquare = parseInt(location[0]) + parseInt(size)
        if (endSquare > gridSize) {
            return null
        }

        for (var i = location[0]; i < endSquare; i++) {
            var square = "" + i + row
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
    //EventHandler for shooting in the battleship
    gridShoot = (event) => {
        if (this.state.shot) {
            alert("You already shot, press continue")
            return null
        }
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
        if (!this.state.shot) {
            alert("Shoot your shot!")
            return null
        }
        if (this.state.playerTurn === this.props.player1Name) {
            this.setState({ playerTurn: this.props.player2Name, showMiddleScene: true, shot: false, infoSceneMessage: '' })
        } else {
            this.setState({ playerTurn: this.props.player1Name, showMiddleScene: true, shot: false, infoSceneMessage: '' })
        }

    }
    //Initialize ships from the shipstate
    initializeShips(ships) {
        var shipComponents = []
        var uniqueKey = 0
        const rotate = this.state.rotate
        Object.keys(ships).map(function (key) {
            uniqueKey++
            const shipCount = ships[key]
            for (let i = 0; i < shipCount; i++) {
                shipComponents.push(<Ship name={key} rotate={rotate} key={uniqueKey} size={ShipSizes[key]} />)
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
    //Player confirms ships are set
    shipsSetButton() {
        if (this.state.playerTurn === this.props.player1Name && this.state.p1ShipPlacement.length === this.props.shipSquares) {
            this.setState({ playerTurn: this.props.player2Name, showMiddleScene: true, ships: this.props.ships })
        } else if (this.state.playerTurn === this.props.player2Name && this.state.p2ShipPlacement.length === this.props.shipSquares) {
            this.setState({
                shipsSet: true,
                playerTurn: this.props.player1Name,
                showMiddleScene: true,
                infoSceneDesc: 'Shoot by clicking the square on the enemy board.'
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
            this.setState({ winner: this.state.player2Name, gameOver: true })
        }
    }
    //renders the ships preplacement, Checks if r is pressed for rotate.
    shipRender(shipsComponents) {
        if(this.state.rotate) {
            return(
                <Grid container direction="row"
                justify="center"
                alignItems="baseline" spacing={1}>
                    {shipsComponents.map((component, index) => (
                        <Grid item key={index}>
                        {component}
                    </Grid>
                ))}
                </Grid>
            )

        } else {
        return (
            <ul className="shipUl">
                {shipsComponents.map((component, index) => (
                    <li key={index}>
                        {component}
                    </li>
                ))}
            </ul>
        )
        }

    }
    onKeyPressed = (e) => {
        if (e.key === 'r') {
            if (this.state.rotate) {
                this.setState({ rotate: false })
            } else {
                this.setState({ rotate: true })
            }
        }
    }

    resetGame = () => {
        this.props.resetGame()
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
                <div className="gamePlayContainer">
                    <div className="floatContainer">
                    <WinnerScreen winner={playerTurn} newGame={this.resetGame}/>
                    </div>
                </div>
            )
        }
        else if (!shipsSet && playerTurn === player1Name) {
            const shipsComponents = this.initializeShips(ships)
            return (
                <div tabIndex={0} onKeyPress={this.onKeyPressed}>
                    <InfoScene player={playerTurn} desc={infoSceneDesc} />
                    <div className="gamePlayContainer">
                        <div className="floatContainer">
                            <h2>Your Board</h2>
                            <ShipPlacementBoard placedShips={p1ShipPlacement} rows={rows} enemyShooting={p2ShootingHistory} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />
                            <Button variant="contained" color="secondary" size="small" onClick={this.resetShipPlacement.bind(this)}>Reset Ships</Button>
                            <Button variant="contained" color="primary" size="small" onClick={this.shipsSetButton.bind(this)}>Confirm ship placement</Button>
                        </div>
                        <div className="floatContainer">
                            {this.shipRender(shipsComponents)}
                            <p>Press R to rotate ships.</p>
                        </div>
                        <Button variant="contained" size="medium" color="secondary" onClick={() => {if(window.confirm('Are you sure you want to end the game?')){this.resetGame()}}}>End game</Button>
                    </div>
                </div>
            )
        }
        else if (!shipsSet && playerTurn === player2Name) {
            const shipsComponents = this.initializeShips(ships)
            return (
                <div tabIndex={0} onKeyPress={this.onKeyPressed}>
                    <InfoScene player={playerTurn} desc={infoSceneDesc} extra={infoSceneMessage} />
                    <div className="gamePlayContainer">
                        <div className="floatContainer">
                            <ShipPlacementBoard placedShips={p2ShipPlacement} enemyShooting={p1ShootingHistory} rows={rows} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />
                            <Button variant="contained" color="secondary" size="small" onClick={this.resetShipPlacement.bind(this)}>Reset Ships</Button>
                            <Button variant="contained" color="primary" size="small" onClick={this.shipsSetButton.bind(this)}>Confirm ship placement</Button>
                        </div>
                        <div className="floatContainer">
                        {this.shipRender(shipsComponents)}
                            <p>Press R to rotate ships.</p>
                        </div>
                        <Button variant="contained" size="medium" color="secondary" onClick={() => {if(window.confirm('Are you sure you want to end the game?')){this.resetGame()}}}>End game</Button>
                    </div>
                </div>
            )
        } else if (shipsSet && !gameOver) {
                //Ships are set game can begin
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
                                <h1>Your Board</h1>
                                <ShipPlacementBoard placedShips={p1ShipPlacement} enemyShooting={p2ShootingHistory} rows={rows} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />

                            </div>

                            <Button variant="contained" size="small" color="primary" onClick={this.shootingContinueButtonOnClick.bind(this)}>Continue</Button>
                            <div className="floatContainer">
                                <h1>Enemy Board</h1>
                                <BattleBoard
                                    enemyPlacement={p2ShipPlacement}
                                    shootingHistory={p1ShootingHistory}
                                    rows={rows}
                                    columns={columns}
                                    handleClick={this.gridShoot.bind(this)} />
                            </div>
                            <Button variant="contained" size="medium" color="secondary" onClick={() => {if(window.confirm('Are you sure you want to end the game?')){this.resetGame()}}}>End game</Button>
                        </div>
                    </div>

                )
            } else {
                //Player2 turn to shoot
                return (
                    <div>
                        <InfoScene player={playerTurn} desc={infoSceneDesc} extra={infoSceneMessage} />
                        <div className="gamePlayContainer">
                            <div className="floatContainer">
                            <h1>Enemy Board</h1>
                                <BattleBoard
                                    enemyPlacement={p1ShipPlacement}
                                    shootingHistory={p2ShootingHistory}
                                    rows={rows}
                                    columns={columns}
                                    handleClick={this.gridShoot.bind(this)} />
                            </div>
                            <Button variant="contained" size="small" color="primary" onClick={this.shootingContinueButtonOnClick.bind(this)}>Continue</Button>
                            <div className="floatContainer">
                            <h1>Your Board</h1>
                                <ShipPlacementBoard placedShips={p2ShipPlacement} enemyShooting={p1ShootingHistory} rows={rows} columns={columns} handleDrop={this.shipDropHandler.bind(this)} />

                            </div>
                            <Button variant="contained" size="medium" color="secondary" onClick={() => {if(window.confirm('Are you sure you want to end the game?')){this.resetGame()}}}>End game</Button>
                        </div>

                    </div>

                )

            }


        }
    }





}
export default Gameplay