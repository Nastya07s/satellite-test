import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Figure from './../Figure/Figure.jsx';

export default class Figures extends Component {

  state = {
    activeType: -1,
  }

  toggleActive = (type) => {
    console.log(type);
    this.setState({activeType: type});
  }

  render() {
    const figures = this.props.types.map((type, key) => {
      return <Figure key={key} type={type} onToggleActive={this.toggleActive} active={this.state.activeType === type ? true : false}/>
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

