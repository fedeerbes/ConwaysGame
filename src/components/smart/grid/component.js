import React, {Component} from "react";
import DummyGrid from "../../dummy/grid/component.js";
import {gameEngineSingleton} from "../../../utils/gameEngine"

class SmartGrid extends Component<{}> {

  constructor() {
    super();
    this.state = {
      rows: 50,
      columns: 50,
      grid: [],
      population: 0,
      step: 0
    }
  }

  componentDidMount = () => {
    let rows = this.state.rows,
        columns = this.state.columns,
        grid = gameEngineSingleton.initGrid(rows, columns) //Initiate grid with dead cells
    this.setState({grid}, () => this._initPopulation())
  }

  _initPopulation = () => {
    let {grid, population} = gameEngineSingleton.initPopulation(this.state.grid) //Set alive cells
    this.setState({grid: grid, population: population}, () => this._stepForward())
  }

  _stepForward = () => {
    this.interval = setInterval(() => {
      let {grid, population} = gameEngineSingleton.stepForward(this.state.grid);
      this.setState({grid: grid, population: population, step: this.state.step + 1});
      if (population === 0) clearInterval(this.interval)
    }, 1000);
  }

  render() {
    return (
      <DummyGrid
        grid={this.state.grid}
        population={this.state.population}
        step={this.state.step}
      />);
  }
}

export default SmartGrid;
