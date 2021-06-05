let gridSize = 4;
let gridPixelSize = 800;

// initial cell size
let cellSize = gridPixelSize / gridSize;

// darkenMode enable flag
const modes = {
  'default': false,
  'darken': false,
  'rgb': false,
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
  const darkenModeInput = document.querySelector('.grid-range__darken-mode');
  darkenModeInput.addEventListener('change', e => {
    e.preventDefault();
    toggle(modes, false, 'darken');
  })
}

function listenRgbModeChange() {
  const rgbModeInput = document.querySelector('.grid-range__rgb-mode');

  rgbModeInput.addEventListener('change', e => {
    e.preventDefault();
    toggle(modes, false, 'rgb');
  })
}

function listenDefaultModeChange() {
  const defaultModeInput = document.querySelector('.grid-range__default-mode');

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
  const gridRangeInput = document.querySelector('.grid-range__size');

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
      cell.style.backgroundColor = 'transparent';
    })
  })
}

renderGrid();
useListeners();
