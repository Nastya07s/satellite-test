import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Figure.scss";

export default class Figure extends Component {

  render() {
    const { id, type, active, onToggleActive, dragStart } = this.props;
    const figureClass = active ? `figure figure-active ${type}` : `figure ${type}`;

    return (
      <div
        className={figureClass}
        onDragStart={dragStart}
        onClick={() => onToggleActive(type)}
        draggable
      >
        <img
          src={`./assets/img/${type}.png`}
          alt="tt"
          id={id}
          style={{ width: 290, height: 90 }}
        />
      </div>
    );
  }
}

Figure.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  active: PropTypes.bool,
  dragStart: PropTypes.func,
  onToggleActive: PropTypes.func,
};
