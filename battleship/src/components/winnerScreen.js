import React from 'react';
import '../index.css';
import Button from '@material-ui/core/Button';

const WinnerScreen = (props) => {

    return( <div>
            <h1>Game Over</h1>
            <h2>Winner is {props.winner}</h2>
            <h2><Button variant="contained" size="medium" color="primary" onClick={props.newGame}>New Game</Button> </h2>
            </div>
    )
}

export default WinnerScreen


