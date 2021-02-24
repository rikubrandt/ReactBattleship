import React from 'react';
import BattleBoard from './components/battleboard'
import InfoScene from './components/infoScene'
import MiddleScene from './components/middleScene';
import './index.css';


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

        }
    }

    middleSceneClick = (event) => {
        if(this.state.playerTurn === this.props.player1Name) {
            this.setState({playerTurn: this.props.player2Name})
        } else {
            this.setState({playerTurn: this.props.player1Name})
        }
        this.setState({showMiddleScene: false})
    }

    shipAddClick = (event) => {
        console.log("Grid number "+ event)
    }

    render() {
        const {rows, columns, player1Name, player2Name} = this.props
        const {showMiddleScene, playerTurn, shipsSet} = this.state

        //Cutscene so for changing the active player.
        if(showMiddleScene===true) {
            return(
                <MiddleScene player={playerTurn} handleClick={this.middleSceneClick} />
            )
        }
        if(shipsSet===false && playerTurn === player1Name) {
            return(
                <div>
                <InfoScene title="Place your ships for the game to begin faggots..."></InfoScene>
                <div class="row">
                <div class="board">
                <h1>Player: {this.props.player1Name}</h1>
                <BattleBoard rows={rows} columns={columns} handleClick={this.shipAddClick.bind(this)}/>
                </div>
                <div class="info">
                <h1>Available ships:</h1>
                <ul>
                    <a>Paatit tähän</a>
                </ul>
                </div>
                <div class="board">
                <h1>Player: {this.props.player2Name}</h1>
                <BattleBoard rows={rows} columns={columns} handleClick={this.shipAddClick.bind(this)}/>
                </div>
                </div>
                </div>
            )
        }
        
    }

}
export default Gameplay