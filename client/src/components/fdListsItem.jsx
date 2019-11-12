import React, {Component} from 'react';

class FdListsItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  render(){
    return(
      <div className="fd-item">
        <div className="left-section">
          <p>{this.state.data.first_name}</p>
        </div>
        <div className="middle-section">
          <p>{this.state.data.last_name}</p>
          <p>{this.state.data.position}</p>
        </div>
        <div className="right-section">{this.state.data.weight_pounds}</div>
      </div>
    )
  }
};

export default FdListsItem;
