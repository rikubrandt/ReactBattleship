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
            <table id="ship-table" class="ship-container">
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
                    <td class="ticker-box">-</td>
                    <td name="carrier" onChange={this.onShipFieldChange.bind(this)}>0</td>
                    <td class="ticker-box">+</td>
                    </tr>
                    <tr>
                    <td>Battleship</td>
                    <td class="ticker-box">-</td>
                    <td name="battleship" onChange={this.onShipFieldChange.bind(this)}>0</td>
                    <td class="ticker-box">+</td>
                    </tr>
                    <tr>
                    <td>Submarine</td>
                    <td class="ticker-box">-</td>
                    <td name="submarine" onChange={this.onShipFieldChange.bind(this)}>0</td>
                    <td class="ticker-box">+</td>
                    </tr>
                    <tr>
                    <td>Cruiser</td>
                    <td class="ticker-box">-</td>
                    <td name="cruiser" onChange={this.onShipFieldChange.bind(this)}>0</td>
                    <td class="ticker-box">+</td>
                    </tr>
                    <tr>
                    <td>Destroyer</td>
                    <td class="ticker-box">-</td>
                    <td name="destroyer" onChange={this.onShipFieldChange.bind(this)}>0</td>
                    <td class="ticker-box">+</td>
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