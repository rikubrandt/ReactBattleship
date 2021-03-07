import React from 'react';

const InfoScene = (props) => {

        return(
            <div className="info">
                <h1>React Battleship</h1>
                <h2>Player: {props.player}</h2>
                <h3>{props.desc}</h3>
            </div>
        )

}
export default InfoScene