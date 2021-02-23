import React from 'react';
import '../index.css';

class Cell extends React.Component {
    
    handleClick = (event) => {
      this.props.handleClick(event.target.id)
    }
    
    render() {
  
      return (
  
        <div onClick={this.handleClick} id={this.props.id} className="cell">
  
          {this.props.id}
  
        </div>
  
      );
  
    }
  
  }
  
  export default Cell;