import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Figure.scss";

export default class Figure extends Component {

  render() {
    const { type, active } = this.props;
    const figureClass = active ? `figure figure-active` : `figure`;

    return (
      <div
        className={figureClass}
        onDragStart={this.props.dragStart}
        draggable
      >
        <img
          src={`./assets/img/${type}.png`}
          alt="tt"
          id={this.props.id}
          style={{ width: 300, height: 100 }}
        />
      </div>
    );
  }
}

Figure.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  dragStart: PropTypes.func,
  id: PropTypes.string,
};
