import React from 'react';

const MiddleScene = (props) => {
    return(
        <div className="middleScene">
            <h2>Player {props.player} turn</h2>
            <button onClick={props.handleClick}>Continue</button>
        </div>
    )


}
export default MiddleScene