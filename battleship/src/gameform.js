import React from 'react';
import './index.css';


class Gameform extends React.Component {
    onFieldChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }

    onShipFieldChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onShipChange(fieldName, fieldValue);
    }


    render() {
    return(
        <div className="gameForm">
            <h1>React Battleship</h1>
            <form onSubmit={this.props.onSubmit}>
            Player 1 name: <input name="player1" onChange={this.onFieldChange.bind(this)} /> <br/>
            Player 2 name: <input name="player2" onChange={this.onFieldChange.bind(this)} /><br/>
            <h2>Enter the amount of ships for the game</h2>

            <label htmlFor="carrier">carrier (0-1):</label>
            <input type="number" id="shipForm" name="carrier" min="0" max="1" onChange={this.onShipFieldChange.bind(this)}  /> 
            <br/>
            <label htmlFor="battleship">battleship (0-2):</label>
            <input type="number" id="shipForm" name="battleship" min="0" max="2" onChange={this.onShipFieldChange.bind(this)} />
            <br/>
            <label htmlFor="cruiser">cruiser (0-3):</label>
            <input type="number" id="shipForm" name="cruiser" min="0" max="3" onChange={this.onShipFieldChange.bind(this)} /> 
            <br/>
        
            <label htmlFor="submarine">submarine (0-4):</label>
            <input type="number" id="shipForm" name="submarine" min="0" max="4" onChange={this.onShipFieldChange.bind(this)} />
            <br/>
            <label htmlFor="destroyer">destroyer (0-5):</label>
            <input type="number" id="shipForm" name="destroyer" min="0" max="5" onChange={this.onShipFieldChange.bind(this)} /> 
            <br/>
            
            Grid Size: <input type="range" list="tickmarks" defaultValue="5" min="5" max="10" name="gameGridSize" onChange={this.onFieldChange.bind(this)}/><br/> 
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