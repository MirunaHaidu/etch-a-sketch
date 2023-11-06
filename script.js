const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode){
    currentMode = newMode;
    activateButton(newMode)
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn')
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const randomBtn = document.getElementById('randomBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const gridContainer = document.getElementById('gridContainer');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
eraserBtn.onclick = () => setCurrentMode('eraser');
randomBtn.onclick = () => setCurrentMode('random');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(sizeSlider.value)
sizeSlider.onchange = (e) => changeSize(sizeSlider.value);


let isMouseDown = false;
document.body.onmousedown = () => (isMouseDown = true)
document.body.onmouseup = () => (isMouseDown = false)

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
  }

  function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
  }

  function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
  }

  function clearGrid() {
    gridContainer.innerHTML = ''
  }

  function setupGrid(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        gridContainer.appendChild(gridElement)
    }
  }


  function changeColor(e){
    if(e.type === 'mouseover' && !isMouseDown) return;
    if(currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;
    } else if(currentMode === 'eraser'){
        e.target.style.backgroundColor = '#fbf1ea'
    } else if(currentMode === 'random'){
        const randomR = Math.floor(Math.random()*256);
        const randomG = Math.floor(Math.random()*256);
        const randomB = Math.floor(Math.random()*256);
        const randomColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        e.target.style.backgroundColor = randomColor;
    }
  }

  function activateButton(newMode) {
    if (currentMode === 'color') {
      colorBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active');
    } else if(currentMode === 'random'){
    randomBtn.classList.remove('active');
    }
  
    if (newMode === 'color') {
      colorBtn.classList.add('active');
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active');
    } else if(newMode === 'random'){
        randomBtn.classList.add('active');
    }
  }


  window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
  }
