import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Figure from './../Figure/Figure.jsx';
import './Figures.scss';

export default class Figures extends Component {

  state = {
    activeType: -1,
  }

  onToggleActive = (type) => {
    this.setState({activeType: type})
  }


  dragStart({ dataTransfer, target}) {
    dataTransfer.effectAllowed = 'move';
    
    dataTransfer.setData('id', target.id);
    dataTransfer.setDragImage(target, 100, 100);
  }

  render() {
    const figures = this.props.types.map((type, key) => {
      return <Figure 
                key={key} 
                id={`${type}${key}`}
                type={type} 
                active={this.state.activeType === type ? true : false}
                dragStart={this.dragStart}
                onToggleActive={this.onToggleActive}
              />
    });

    return (
      <div className="">
        {figures}
      </div>
    )
  }
}

Figures.propTypes = {
  types: PropTypes.array,
}

