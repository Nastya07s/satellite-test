import React, { Component } from 'react';

export default class Canvas extends Component {
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
      // const ctx = this.refs.canvas.getContext('2d');
      // ctx.fillRect(0,0, 100, 100);
  }
  render() {
    return (
      <canvas width="1040" height="800"></canvas>
    )
  }
}
