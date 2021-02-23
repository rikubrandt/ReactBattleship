import React from 'react';
import './index.css';


class Gameform extends React.Component {
    onFieldChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }


    render() {
    return(
        <div className="gameForm">
            <h1>React Battleship</h1>
            <form onSubmit={this.props.onSubmit}>
            Player 1 name: <input name="player1" onChange={this.onFieldChange.bind(this)} /> <br/>
            Player 2 name: <input name="player2" onChange={this.onFieldChange.bind(this)} /><br/>
            Grid Size: <input type="range" list="tickmarks" defaultValue="5" min="5" max="10" name="gridSize" onChange={this.onFieldChange.bind(this)}/><br/> 
            <datalist id="tickmarks">
                <option value="5"></option>
                <option value="6"></option>
                <option value="7"></option>
                <option value="8"></option>
                <option value="9"></option>
                <option value="10"></option>
            </datalist>
            <button type="submit">Start Game</button>
            </form>
        </div>
    )}

}

export default Gameform