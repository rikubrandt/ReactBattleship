import React from 'react';

const InfoScene = (props) => {

        return(
            <div className="info">
                <h1>React Battleship</h1>
                <h2>{props.title}</h2>
                <p>{props.desc}</p>
            </div>
        )

}
export default InfoScene