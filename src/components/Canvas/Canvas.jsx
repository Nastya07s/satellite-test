import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Canvas.scss";

export default class Canvas extends Component {
  state = {
    figuresInCanvas: [],
    isMouseDown: false,
    isMoveable: false,
    firstScreenX: null,
    firstScreenY: null,
    currentFigureIdx: null,
  };

  componentDidMount = () => {
    this.ctx = document.getElementById("canvas").getContext("2d");
  };

  componentDidUpdate = () => {
    this.ctx.clearRect(0, 0, 1040, 800);
    setTimeout(this.drawInCanvas(), 0);
  };

  drawInCanvas = () => {
    // console.log("this.state.figuresInCanvas: ", this.state.figuresInCanvas);
    this.state.figuresInCanvas.forEach(
      ({ id: figure, minScreenX, minScreenY }) => {
        // console.log("figure: ", [figure]);
        const image = new Image();
        image.src = figure.src;
        image.onload = () => {
          this.ctx.drawImage(figure, minScreenX, minScreenY);
        };
      }
    );
  };

  dragEnter = (event) => {
    event.preventDefault();
  };

  dragOver = (event) => {
    event.preventDefault();
  };

  dragDrop = (event) => {
    const { screenX, screenY } = event;
    const data = event.dataTransfer.getData("id");
    const figure = document.querySelector(`.figures #${data}`);

    const { top, left } = document
      .querySelector("canvas")
      .getBoundingClientRect();

    this.setState((state) => ({
      figuresInCanvas: [
        ...state.figuresInCanvas,
        {
          id: figure,
          minScreenX: screenX - left,
          minScreenY: screenY - top - 70,
          maxScreenX: screenX - left + 300,
          maxScreenY: screenY - top - 70 + 100,
        },
      ],
    }));

    event.stopPropagation();
  };

  onMouseDown = (event) => {
    // console.log(this.state.figuresInCanvas[0]);
    const { top, left } = document
      .querySelector("canvas")
      .getBoundingClientRect();
    this.setState({
      isMouseDown: true,
      firstScreenX: event.screenX - left,
      firstScreenY: event.screenY - top - 70,
    });
    // console.log('event.screenX: ', event.screenX);
    // console.log('event.screenY: ', event.screenY);
  };

  onMouseUp = () => {
    // const newState = {
    //   isMouseDown: false,
    //   isMoveable: false,
    //   currentFigureIdx: null,
    //   firstScreenX: null,
    //   firstScreenY: null,
    // }
    // console.log('event.screenX: ', event.screenX);
    // console.log('event.screenY: ', event.screenY);
    this.setState(() => ({
      // figuresInCanvas: [
      //   ...state.figuresInCanvas.slice(0, state.currentFigureIdx),
      //   ...state.figuresInCanvas.slice(state.currentFigureIdx + 1),
      // ],
      isMouseDown: false,
      isMoveable: false,
      currentFigureIdx: null,
      firstScreenX: null,
      firstScreenY: null,
    }));
  };

  findCurrentFigureIdx = (arrayOfFigures, firstScreenX, firstScreenY) =>{
    return arrayOfFigures.findIndex(
      (figure) =>
        figure.minScreenX < firstScreenX &&
        figure.minScreenY < firstScreenY &&
        figure.maxScreenX > firstScreenX &&
        figure.maxScreenY > firstScreenY
    );
  }

  onMouseMove = ({ screenX, screenY }) => {
    if (this.state.isMouseDown) {
      const { figuresInCanvas, firstScreenX, firstScreenY, isMoveable, currentFigureIdx } = this.state;

      const figureIdx = isMoveable ? currentFigureIdx : this.findCurrentFigureIdx(figuresInCanvas, firstScreenX, firstScreenY);
      // console.log(figureIdx);

      if (figureIdx > -1) {
        const { top, left } = document
          .querySelector("canvas")
          .getBoundingClientRect();

        const currentFigure = figuresInCanvas[figureIdx];
        // console.log("currentFigure: ", currentFigure);
        currentFigure.minScreenX = screenX - left;
        currentFigure.minScreenY = screenY - top - 70;
        currentFigure.maxScreenX = screenX - left + 300;
        currentFigure.maxScreenY = screenY - top - 70 + 100;

        this.setState((state) => ({
          currentFigureIdx: figureIdx,
          isMoveable: true,
          figuresInCanvas: [
            ...state.figuresInCanvas.slice(0, figureIdx),
            currentFigure,
            ...state.figuresInCanvas.slice(figureIdx + 1),
          ],
        }));
      }
      // console.log('MouseMove ', screenX);
      // console.log('MouseMove ', screenY);
    }
  };

  // onMouseLeave = (event) => {
  //   console.log('MouseLeave event: ', event);

  // }

  onMouseOver = (event) => {
    if(this.state.isMouseDown && event.buttons === 0) {
      console.log('УДАЛЯЙ')
      this.setState((state) => ({
        figuresInCanvas: [
          ...state.figuresInCanvas.slice(0, state.currentFigureIdx),
          ...state.figuresInCanvas.slice(state.currentFigureIdx + 1),
        ],
        currentFigureIdx: null,
        isMoveable: false,
        isMouseDown: false,
      }));
    }
    // console.log('MouseOver', event)
  }

  render() {
    return (
      <canvas
        id="canvas"
        width="1040"
        height="800"
        onDragEnter={(event) => this.dragEnter(event)}
        onDrop={(event) => {
          event.persist();
          this.dragDrop(event);
        }}
        onDragOver={(event) => {
          event.persist();
          this.dragOver(event);
        }}
        onMouseDown={(event) => this.onMouseDown(event)}
        onMouseUp={(event) => this.onMouseUp(event)}
        onMouseMove={(event) => this.onMouseMove(event)}
        onMouseOver={(event) => {event.persist();this.onMouseOver(event)}}
        // onMouseLeave={(event) => {event.persist(); this.onMouseLeave(event)}}
      ></canvas>
    );
  }
}

Canvas.propTypes = {
  dragEnter: PropTypes.func,
  dragDrop: PropTypes.func,
  dragOver: PropTypes.func,
};
