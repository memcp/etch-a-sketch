let gridSize = 16;
let gridPixelSize = 800;
let cellSize = gridPixelSize / gridSize;

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
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;

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
  const container = document.querySelector('.grid');
  // style container, to have no gaps between cells
  container.style.gridTemplateColumns = `repeat(${gridSize}, 0fr)`;
  // put each cell into container
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      container.appendChild(grid[i][j])
    }
  }
  listenHoverEvents(grid);
  listenResetEvent(grid);
}


function listenHoverEvents(grid) {
  // add an event listeners to each grid cell
  grid.forEach(row => {
    row.forEach(cell => {
      cell.addEventListener('mouseenter', e => fillCell(e.target, 'black'));
    })
  })
}

function listenResetEvent(grid) {
  const resetButton = document.querySelector('.reset-button');
  resetButton.addEventListener('click', e => {
    e.preventDefault();
    resetGrid(grid)
  })
}

function makeMenu() {

}

function fillCell(target, color) {
  // pick target cell
  // make the background of the cell black
  target.style.backgroundColor = color;
}

function setupGridRange() {

}

function resetGrid(grid) {
  // make background of each cell to be transparent
  grid.forEach(row => {
    row.forEach(cell => {
      fillCell(cell, 'transparent')
    })
  })
}

renderGrid()
// let grid = makeGrid();
// access dom container
// container.appendChild(cell);
