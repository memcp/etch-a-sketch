let GRID_SIZE = 4;
let GRID_PIXEL_SIZE = 800;

// initial cell size
let cellSize = GRID_PIXEL_SIZE / GRID_SIZE;

const modes = {
  'default': false,
  'darken': false,
  'rgb': false,
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function makeGrid() {
  /* Initialize grid*/
  let grid = new Array(GRID_SIZE);

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(GRID_SIZE);
  }

  /*
  *  Create elements, store them inside grid, they
  *  need later to render cells into the DOM using renderGrid function
  * */
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = document.createElement('div');
      /* Adjust size of the each cell to fit initial grid size in pixels*/
      style(cell, cellSize, cellSize, 0);
      grid[i][j] = cell;
    }
  }
  return grid;
}

function style(cell, width, height, alpha) {
  cell.classList.add('cell');
  cell.style.width = `${width}px`;
  cell.style.height = `${height}px`;
  cell.alpha = alpha;
}

function renderGrid() {
  const gridContainer = document.querySelector('.grid-container');
  let grid = makeGrid();

  alignCellsAsGrid(gridContainer);
  modifyDOM(gridContainer, grid);
  listenHoverEvents(grid);
  listenResetEvent(grid);
}

function alignCellsAsGrid(gridContainer) {
  gridContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 0fr)`;
}

/* Use elements from grid to create representation of it in DOM*/
function modifyDOM(gridContainer, grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      gridContainer.appendChild(grid[i][j])
    }
  }
}


function listenHoverEvents(grid) {
  // Add an event listeners to each grid cell, choose which
  grid.forEach(row => {
    row.forEach(cell => {
      cell.addEventListener('mouseenter', e => {
        applyModes(e.target, cell);
      });
    })
  })
}

/* Apply color modes to specific cell, when it hovered */
function applyModes(target, cell) {
  if (modes.darken) {
    applyDarkenMode(target, cell);
  } else if (modes.rgb) {
    applyRgbMode(target);
  } else {
    applyDefaultMode(target);
  }
}

function applyDarkenMode(target, cell) {
  cell.alpha < 1 ? cell.alpha += 0.1 : cell.alpha = 1;
  target.style.backgroundColor = `rgba(0, 0, 0, ${target.alpha}`;
}

function applyDefaultMode(target) {
  target.style.backgroundColor = 'black';
}

function applyRgbMode(target) {
  target.style.backgroundColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}`
}

/* Set each mode to be equal state, except one */
function toggle(modes, state, except) {
  for (let mode in modes) {
    mode === except ? modes[mode] = !modes[mode] : modes[mode] = state;
  }
}

function listenDarkenModeChange() {
  const darkenModeInput = document.querySelector('.grid__darken-mode');
  darkenModeInput.addEventListener('change', e => {
    e.preventDefault();
    toggle(modes, false, 'darken');
  })
}

function listenRgbModeChange() {
  const rgbModeInput = document.querySelector('.grid__rgb-mode');

  rgbModeInput.addEventListener('change', e => {
    e.preventDefault();
    toggle(modes, false, 'rgb');
  })
}

function listenDefaultModeChange() {
  const defaultModeInput = document.querySelector('.grid__default-mode');

  defaultModeInput.addEventListener('change', e => {
    e.preventDefault();
    toggle(modes, false, 'default');
  })
}

function listenResetEvent(grid) {
  const resetButton = document.querySelector('.reset-button');
  resetButton.addEventListener('click', e => {
    e.preventDefault();
    resetGrid(grid)
  })
}

function listenGridSizeChange() {
  const gridRangeForm = document.querySelector('.grid-range');
  const gridRangeInput = document.querySelector('.grid__size');

  // prevent default refresh for form
  gridRangeForm.addEventListener('submit', e => e.preventDefault());

  gridRangeInput.addEventListener('change', e => {
    let message = updateGrid(e.target.value);
    if (message) {
      showError(message);
    }
  })
}

function useListeners() {
  listenGridSizeChange();
  listenDarkenModeChange();
  listenRgbModeChange();
  listenDefaultModeChange();
}

function showError(message) {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.textContent = message;

  setTimeout(() => errorMessage.textContent = '', 3000);
}

function updateGrid(size) {
  // access value of input inside DOM
  const updatedGridSize = parseInt(size);
  // check if it value in range from 0 to 100
  if (updatedGridSize < 0) return 'Value of the grid size cannot be negative';
  if (updatedGridSize > 99) return 'Value of the grid size cannot be larger then 100';

  // change gridSize
  GRID_SIZE = updatedGridSize;

  // change cell size
  cellSize = GRID_PIXEL_SIZE / GRID_SIZE;

  // delete previous grid;
  deleteGrid();

  // call makeGrid to make grid with new size
  let grid = makeGrid();
  // call renderGrid to update grid in DOM
  renderGrid(grid);
}

function deleteGrid() {
  const grid = document.querySelector('.grid-container');
  grid.innerHTML = '';
}

function resetGrid(grid) {
  // make background of each cell to be transparent
  grid.forEach(row => {
    row.forEach(cell => {
      cell.alpha = 0;
      cell.style.backgroundColor = 'transparent';
    })
  })
}

renderGrid();
useListeners();
