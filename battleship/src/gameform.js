import React from 'react';
import './index.css';


class Gameform extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                carrier: 0,
                battleship: 0,
                cruiser: 0,
                submarine: 0,
                destroyer: 0,
        }
    }
    onFieldChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }

    onShipFieldChange(event) {
        console.log(event)
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onShipChange(fieldName, fieldValue);
    }

    IncrementItem = (key) => {
        const value = this.state[key];
        this.setState({ [ key ]: value + 1 });
        this.props.onShipChange(key, value+1)
    }
    
    DecrementItem = (key) => {
        const value = this.state[key];
        this.setState({ [ key ]: value - 1 });
        this.props.onShipChange(key, value-1)
      }

    render() {
    return(
        <div className="gameForm">
            <h1>React Battleship</h1>
            <form onSubmit={this.props.onSubmit}>
            Player 1 name: <input name="player1" onChange={this.onFieldChange.bind(this)} /> <br/>
            Player 2 name: <input name="player2" onChange={this.onFieldChange.bind(this)} /><br/>
            <h2>Enter the amount of ships for the game</h2>
            <table id="ship-table" className="ship-container">
                <thead>
                    <tr>
                        <th>Ship</th>
                        <th></th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Carrier</td>
                    <td className="ticker-box" onClick={() => this.DecrementItem('carrier')}>-</td>
                    <td name="carrier" onChange={this.onShipFieldChange.bind(this)}>{this.state.carrier}</td>
                    <td className="ticker-box" onClick={() => this.IncrementItem('carrier')}>+</td>
                    </tr>
                    <tr>
                    <td>Battleship</td>
                    <td className="ticker-box" onClick={() => this.DecrementItem('battleship')}>-</td>
                    <td name="battleship" onChange={this.onShipFieldChange.bind(this)}>{this.state.battleship}</td>
                    <td className="ticker-box" onClick={() => this.IncrementItem('battleship')}>+</td>
                    </tr>
                    <tr>
                    <td>Submarine</td>
                    <td className="ticker-box" onClick={() => this.DecrementItem('submarine')}>-</td>
                    <td name="submarine" onChange={this.onShipFieldChange.bind(this)}>{this.state.submarine}</td>
                    <td className="ticker-box" onClick={() => this.IncrementItem('submarine')}>+</td>
                    </tr>
                    <tr>
                    <td>Cruiser</td>
                    <td className="ticker-box" onClick={() => this.DecrementItem('cruiser')}>-</td>
                    <td name="cruiser" onChange={this.onShipFieldChange.bind(this)}>{this.state.cruiser}</td>
                    <td className="ticker-box" onClick={() => this.IncrementItem('cruiser')}>+</td>
                    </tr>
                    <tr>
                    <td>Destroyer</td>
                    <td className="ticker-box" onClick={() => this.DecrementItem('destroyer')}>-</td>
                    <td name="destroyer" onChange={this.onShipFieldChange.bind(this)}>{this.state.destroyer}</td>
                    <td className="ticker-box" onClick={() => this.IncrementItem('destroyer')}>+</td>
                    </tr>
                </tbody>
            </table>

            
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