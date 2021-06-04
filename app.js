let gridSize = 16;

function makeGrid() {
  // access dom container
  const container = document.querySelector('.container');

  // create an 2d array of elements (divs)
  let grid = new Array(gridSize);

  // initialize array of arrays (grid);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(gridSize);
  }

  // go through each cell of the grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // create a cell in memory
      const cell = document.createElement('div');
      // apply classes to style specific cell
      cell.classList.add('cell');
      // align cells as grid
      container.style.gridTemplateColumns = `repeat(${gridSize}, 0fr)`;
      grid[i][j] = cell;
      // put these divs into container
      container.appendChild(cell);
    }
  }

  return grid;
}


function listenHoverEvents() {

}

function makeMenu() {

}

function fillCell() {

}

function setupGridRange() {

}

function resetGrid() {

}

makeGrid();