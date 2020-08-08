import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Canvas.scss';

export default class Canvas extends Component {
  state = {
    figuresInCanvas: [],
  }

  dragEnter = (event) => {
    event.preventDefault();
  }

  dragOver = (event) => {
    event.preventDefault();
  }

  dragDrop = (event) => {
    const { screenX, screenY } = event;
    const data = event.dataTransfer.getData('id');
    const figure = document.querySelector(`.figures #${data}`);

    const ctx = document.getElementById('canvas').getContext('2d');

    const {top, left} = document.querySelector('canvas').getBoundingClientRect();

    const image = new Image();
    image.src = figure.src;
    image.onload = () => {
      ctx.drawImage(figure, screenX - left, screenY - top - 70);
    };

    this.setState((state) => ({
      figuresInCanvas: [
        ...state.figuresInCanvas,
        {id: figure, screenX: screenX - left, screenY: screenY - top - 70}
      ]
    }))

    event.stopPropagation();
  }

  render() {
    return (
      <canvas id="canvas" width="1040" height="800" 
        onDragEnter={(event) => this.dragEnter(event)}
        onDrop={(event) => {event.persist();this.dragDrop(event)}}
        onDragOver={(event) => {event.persist();this.dragOver(event)}}
        >
      </canvas>
    )
  }
}

Canvas.propTypes = {
  dragEnter: PropTypes.func,
  dragDrop: PropTypes.func,
  dragOver: PropTypes.func,
}
