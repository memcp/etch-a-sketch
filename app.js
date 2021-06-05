let gridSize = 4;
let gridPixelSize = 800;

// initial cell size
let cellSize = gridPixelSize / gridSize;

// darkenMode enable flag
let darkenMode = false;

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

      // depend on dark whether mode or not
      cell.alpha = 0;

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
      cell.addEventListener('mouseenter', e => {
        if (darkenMode) {
          cell.alpha < 1 ? cell.alpha += 0.1 : cell.alpha = 1;
          fillCell(e.target, 'black', darkenMode);
        } else {
          fillCell(e.target, 'black');
        }
      });
    })
  })
}

function listenDarkenModeChange() {
  const darkenModeInput = document.querySelector('.grid-range__darken-mode');
  darkenModeInput.addEventListener('change', e => {
    e.preventDefault();
    darkenMode = !darkenMode;
  })
}

function listenResetEvent(grid) {
  const resetButton = document.querySelector('.reset-button');
  resetButton.addEventListener('click', e => {
    e.preventDefault();
    resetGrid(grid)
  })
}

function fillCell(target, color, darkenMode=false) {
  // pick target cell
  if (darkenMode) {
    // make background darker each time user pass through
    target.style.backgroundColor = `rgba(0, 0, 0, ${target.alpha}`;
  } else {
    // make the background of the cell black immediately
    target.style.backgroundColor = color;
  }

}

function listenGridSizeChange() {
  const gridRangeForm = document.querySelector('.grid-range');
  const gridRangeInput = document.querySelector('.grid-range__size');

  // prevent default refresh for form
  gridRangeForm.addEventListener('submit', e => e.preventDefault());

  gridRangeInput.addEventListener('change', e => {
    updateGrid(e.target.value);
  })
}

function updateGrid(size) {
  // access value of input inside DOM
  const updatedGridSize = parseInt(size);
  // check if it value in range from 0 to 100
  if (updatedGridSize < 0) return 'Value of the grid size cannot be negative';
  if (updatedGridSize > 99) return 'Value of the grid size cannot be larger then 100';

  // change gridSize
  gridSize = updatedGridSize;

  // change cell size
  cellSize = gridPixelSize / gridSize;

  // delete previous grid;
  deleteGrid();

  // call makeGrid to make grid with new size
  let grid = makeGrid();
  // call renderGrid to update grid in DOM
  renderGrid(grid);
}

function deleteGrid() {
  const grid = document.querySelector('.grid');
  grid.innerHTML = '';
}

function resetGrid(grid) {
  // make background of each cell to be transparent
  grid.forEach(row => {
    row.forEach(cell => {
      cell.alpha = 0;
      fillCell(cell, 'transparent')
    })
  })
}

renderGrid();
listenGridSizeChange();
listenDarkenModeChange();
