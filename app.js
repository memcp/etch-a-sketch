let gridSize = 16;

function makeGrid() {

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
      grid[i][j] = cell;
      // put these divs into container
    }
  }

  return grid;
}

function renderGrid() {
  // make a grid
  let grid = makeGrid();
  // access container in dom
  const container = document.querySelector('.container');
  // style container, to have no gaps between cells
  container.style.gridTemplateColumns = `repeat(${gridSize}, 0fr)`;
  // put each cell into container
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      container.appendChild(grid[i][j])
    }
  }
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

renderGrid()
// let grid = makeGrid();
// access dom container
// container.appendChild(cell);
