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
            <h2>Enter the amount of ships for the game</h2>
            <div class="ships">
            carrier (0-1): <input name="carrier" onChange={this.onFieldChange.bind(this)} /> <br/>
            battleship (0-2): <input name="battleship" onChange={this.onFieldChange.bind(this)} /><br/>
            cruiser (0-3): <input name="cruiser" onChange={this.onFieldChange.bind(this)} /> <br/>
            submarine (0-4): <input name="submarine" onChange={this.onFieldChange.bind(this)} /><br/>
            destroyer (0-5): <input name="destroyer" onChange={this.onFieldChange.bind(this)} /> <br/>
            </div>
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