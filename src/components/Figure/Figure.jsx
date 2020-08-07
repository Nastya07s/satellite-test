import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Figure.scss';

export default class Figure extends Component {

  // state = {
  //   active: false,
  // }

  // setActive = () => {
  //   this.setState({active: true});
  // }

  render() {
    const figureClass = this.props.active ? `figure figure-active ${this.props.type}` : `figure ${this.props.type}`
    console.log('figureClass: ', figureClass);
    return (
      <div className={figureClass} onClick={() => this.props.onToggleActive(this.props.type)}></div>
    )
  }
}

Figure.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  onToggleActive: PropTypes.func,
}
