import React from 'react';


class Gameform extends React.Component {
    onFieldChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }


    render() {
    return(
        <div>
            <form onSubmit={this.props.onSubmit}>
            Player 1 name: <input name="player1" onChange={this.onFieldChange.bind(this)} />
            Player 2 name: <input name="player2" onChange={this.onFieldChange.bind(this)} />
            <input type="range" min="5" max="10" name="gridSize" onChange={this.onFieldChange.bind(this)}/>
            <button type="submit">Huhuu</button>
            </form>
        </div>
    )}

}

export default Gameform