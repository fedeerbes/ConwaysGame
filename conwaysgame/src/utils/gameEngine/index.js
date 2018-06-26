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
    for (let i = 0; i < grid.length; i += 1) {
      const columnArray = grid[i];
      for (let j = 0; j < columnArray.length; j += 1) {
        if (columnArray[j]) population += 1;
      }
    }
    return population;
  }

  stepForward = (grid) => {
    //Get current grid a make a copy
    const currentGrid = [...grid];
    let updatedGrid = [];

    for (let i = 0; i < currentGrid.length; i += 1) {
      //Go through the columns
      const currentColumn = currentGrid[i];
      let updatedColumn = [];
      for (let j = 0; j < currentColumn.length; j += 1) {
        //Go through the cells
        const cell = currentColumn[j];
        let neighborCounting = 0,
            cellStatus = currentColumn[j];
        
        //Ask about the state of the neighboring cell
        if ((i - 1 >= 0) && (j - 1 >= 0) && currentGrid[i - 1][j - 1]) neighborCounting += 1;
        if ((i - 1 >= 0) && (j >= 0) && currentGrid[i - 1][j]) neighborCounting += 1;
        if ((i - 1 >= 0) && (j + 1 >= 0) && currentGrid[i - 1][j + 1]) neighborCounting += 1;
        if ((i >= 0) && (j - 1 >= 0) && currentGrid[i][j - 1]) neighborCounting += 1;
        if ((i >= 0) && (j + 1 >= 0) && currentGrid[i][j + 1]) neighborCounting += 1;
        if ((i + 1 >= 0) && (j - 1 >= 0) && (i + 1 < currentColumn.length) && currentGrid[i + 1][j - 1]) neighborCounting += 1;
        if ((i + 1 >= 0) && (j >= 0) && (i + 1 < currentColumn.length) && currentGrid[i + 1][j]) neighborCounting += 1;
        if ((i + 1 >= 0) && (j + 1 >= 0) && (i + 1 < currentColumn.length) && currentGrid[i + 1][j + 1]) neighborCounting += 1;
        
        //Establish rules of the game
        if (cell) {
          // Any live cell with fewer than two live neighbors dies, as if by under population.
          if (neighborCounting < 2) cellStatus = false;

          // Any live cell with two or three live neighbors lives on to the next generation.
          if (neighborCounting >= 2 && neighborCounting < 4) cellStatus = true;

          // Any live cell with more than three live neighbors dies, as if by overpopulation.
          if (neighborCounting > 3) cellStatus = false;
        } else {
          // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
          if (neighborCounting === 3) cellStatus = true;
        }
        //Set new status of the current cell to the updated column
        updatedColumn.push(cellStatus)
      }
      //Set new status of the current column to the updated grid
      updatedGrid.push(updatedColumn)
    }

    return {grid: updatedGrid, population: this.getPopulation(updatedGrid)};
  }
}
export let gameEngineSingleton = new gameEngine();
