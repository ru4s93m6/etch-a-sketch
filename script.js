/* DECLARE VARIABLES */

/* FETCH DOM ELEMENTS */
const colorPicker = document.querySelector("#color-picker");
const modeButtons = document.querySelectorAll(".mode-btn");
const clearBtn = document.querySelector(".clear-btn");
const gridContainer = document.querySelector(".grid-container");
const gridInput = document.querySelector("#grid-input");
const gridSizeContent = document.querySelector("#grid-size-content");

let isDrawing = false;
let gridSize = 16;
let currentColor = "#000";
let hoverColor = "#e7e5e4";
let colorMode = "colorFill";

/* SET DOM ELEMENT EVENTLISTENER */
colorPicker.addEventListener("change", (e) => (currentColor = e.target.value));

gridInput.addEventListener("change", (e) => {
  const SIZE = e.target.value;
  clearGrid();
  generateGrid(SIZE);
  setGridSizeContent(SIZE);
});

modeButtons.forEach((button) => {
  button.addEventListener("click", (e) => setColorMode(e));
});

clearBtn.addEventListener("click", () => clearGridColor());

/* LOGICAL FUNCTION */
function generateGrid(size) {
  const gridContainer = document.querySelector(".grid-container");
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");

    gridCell.addEventListener("mousedown", (e) => startDrawing(e));

    gridCell.addEventListener("mouseup", (e) => endDrawing(e));

    gridCell.addEventListener("mouseenter", (e) => Draw(e));

    gridCell.addEventListener("mouseleave", (e) => removeHoverColor(e));

    gridContainer.appendChild(gridCell);
  }

  setGridSizeContent(size);
}

function setGridSizeContent(size) {
  gridSizeContent.textContent = `${size} x ${size}`;
}

function generateRandomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function getGridColor(e) {
  let color;
  switch (colorMode) {
    case "color":
      color = currentColor;
      break;
    case "rainbow":
      color = generateRandomColor();
      break;
    case "eraser":
      color = "#fff";
      break;
    default:
      color = currentColor;
  }
  return color;
}

function setColorMode(e) {
  const BUTTON = e.target;
  document.querySelector(".active")?.classList.remove("active");
  BUTTON.classList.add("active");
  colorMode = BUTTON.value;
}

/*
   Drawing and Hover Effect Logic
   1. Check if we're in drawing mode
   2. If so, paint the cell
   3. If not, apply hover effect to unpainted cells
*/

function Draw(e) {
  if (isDrawing) {
    let color = getGridColor(e);
    e.target.style.background = color;
    if (colorMode !== "eraser") {
      e.target.classList.add("painted");
    } else {
      e.target.classList.remove("painted");
    }
  } else if (!e.target.classList.contains("painted")) {
    e.target.style.background = hoverColor;
  }
}

function removeHoverColor(e) {
  if (!isDrawing && !e.target.classList.contains("painted")) {
    e.target.style.background = "white";
  }
}

function startDrawing(e) {
  console.log("start Drawing");
  isDrawing = true;
  Draw(e);
}

function endDrawing() {
  isDrawing = false;
}

generateGrid(gridSize);

/** CLEAR FUNCTION **/
function clearGrid() {
  gridContainer.innerHTML = "";
}

function clearGridColor() {
  const GRIDCELLS = Array.from(gridContainer.children);
  GRIDCELLS.forEach((cell) => {
    cell.style.background = "#fff";
  });
}
