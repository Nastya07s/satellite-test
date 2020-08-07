import React, { Component } from 'react';

import Canvas from './../Canvas/Canvas.jsx';
import Figures from './../Figures/Figures.jsx';

import './App.scss';

export default class App extends Component {
  render() {
    const types = ['circle', 'squere'];
    return (
      <main className="flex">
        <div className="figures">
          <Figures types={types}/>
        </div>
        <div className="canvas">
          <Canvas />
        </div>
      </main>
    )
  }
}
