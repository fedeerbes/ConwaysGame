class gameEngine {
  constructor() { }

  initGrid = (rows, column) => {
    //Init grid with dead cells
    let grid = [];
    for (let i = 0; i < rows; i += 1) {
      let columnsArray = []
      for (let j = 0; j < column; j += 1) {
        columnsArray.push(false);
      }
      grid.push(columnsArray);
    }

    return grid
  }

  initPopulation = (grid) => {
    //Set grid with default values
    let updatedGrid = [...grid];

    updatedGrid[0][0] = true;
    updatedGrid[0][1] = true;
    updatedGrid[1][0] = true;
    updatedGrid[1][3] = true;
    updatedGrid[2][1] = true;
    updatedGrid[2][2] = true;
    
    return {grid: updatedGrid, population: this.getPopulation(updatedGrid)};
  }

  getPopulation = (grid) => {
    let population = 0;
    grid.map((column) => {
      column.map((cell) => {
        if (cell) population += 1;
      })
    })

    return population;
  }

  stepForward = (grid) => {
    let currentGrid = [...grid],
        updatedGrid = [];
    currentGrid.map((column, indexColumn) => {
      let columnArray = [];
      column.map((cell, indexCell) => {
        let count = 0,
            isAlive = cell;
        
        //Ask about the state of the neighboring cell
        if ((indexColumn - 1 >= 0) && (indexCell - 1 >= 0) && currentGrid[indexColumn - 1][indexCell - 1]) count += 1;
        if ((indexColumn - 1 >= 0) && (indexCell >= 0) && currentGrid[indexColumn - 1][indexCell]) count += 1;
        if ((indexColumn - 1 >= 0) && (indexCell + 1 >= 0) && currentGrid[indexColumn - 1][indexCell + 1]) count += 1;
        if ((indexColumn >= 0) && (indexCell - 1 >= 0) && currentGrid[indexColumn][indexCell - 1]) count += 1;
        if ((indexColumn >= 0) && (indexCell + 1 >= 0) && currentGrid[indexColumn][indexCell + 1]) count += 1;
        if ((indexColumn + 1 >= 0) && (indexCell - 1 >= 0) && (indexColumn + 1 < column.length) && currentGrid[indexColumn + 1][indexCell - 1]) count += 1;
        if ((indexColumn + 1 >= 0) && (indexCell >= 0) && (indexColumn + 1 < column.length) && currentGrid[indexColumn + 1][indexCell]) count += 1;
        if ((indexColumn + 1 >= 0) && (indexCell + 1 >= 0) && (indexColumn + 1 < column.length) && currentGrid[indexColumn + 1][indexCell + 1]) count += 1;
        
        if (cell) {
          // Any live cell with fewer than two live neighbors dies, as if by under population.
          if (count < 2) isAlive = false;

          // Any live cell with two or three live neighbors lives on to the next generation.
          if (count >= 2 && count < 4) isAlive = true;

          // Any live cell with more than three live neighbors dies, as if by overpopulation.
          if (count > 3) isAlive = false;
        } else {
          // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
          if (count === 3) isAlive = true;
        }
        columnArray.push(isAlive)
      })
      updatedGrid.push(columnArray)
    })
    return {grid: updatedGrid, population: this.getPopulation(updatedGrid)};
  }
}
export let gameEngineSingleton = new gameEngine();
