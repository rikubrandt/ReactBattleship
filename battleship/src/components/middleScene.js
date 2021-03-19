import React from 'react';
import '../styles/index.css';
import Button from '@material-ui/core/Button';


const MiddleScene = (props) => {
    return(
        <div className="info">
            <h2>Player {props.player} turn</h2>
            <Button variant="contained" size="medium" color="primary" onClick={props.handleClick}>Continue</Button>
        </div>
    )


}
export default MiddleScene