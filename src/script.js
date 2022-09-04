const { body } = document;
const canvasContainer = document.getElementsByClassName('white-board')[0];
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
const context = canvas.getContext('2d');

let isMouseDown = false;

const boardColor = '#ffffff';
const currentColor = '#000000';
let strokeArr = [];

// create the canvas
function createCanvas() {
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 50;
    context.fillStyle = boardColor;
    context.fillRect(0,0,canvas.width, canvas.height);
    canvasContainer.appendChild(canvas);
}

// get the position of the mouse
function getMousePosition(event) {
    const canvasBoundaries = canvas.getBoundingClientRect();
    return {
        x: event.clientX - canvasBoundaries.left,
        y: event.clientY - canvasBoundaries.top
    }
}

canvas.addEventListener('mousedown', event => {
    isMouseDown = true;
    const currentMousePosition = getMousePosition(event);
    context.moveTo(currentMousePosition.x, currentMousePosition.y);
    context.beginPath();
    context.lineCap = 'round';
    context.strokeStyle = currentColor;
});

canvas.addEventListener('mouseup', event => {
    isMouseDown = false;
    const currentMousePosition = getMousePosition(event);
    console.log('mouse up called', currentMousePosition);
});

canvas.addEventListener('mousemove', event => {
    if (isMouseDown) {
        const currentMousePosition = getMousePosition(event);
        context.lineTo(currentMousePosition.x, currentMousePosition.y);
        context.stroke();
        strokeArr.push(currentMousePosition);
    } else {
        strokeArr.push({});
    }
});
function clearCanvas () {
    console.log('clearCanvas');
    context.clearRect(0, 0, canvas.width, canvas.height);
    strokeArr = [];
}

function undo () {
    console.log('undo');
    strokeArr.pop();
    saveToLocalStorage();
    loadFromStorage();
}

function redo () {
    console.log('redo');
}

function saveToLocalStorage () {
    console.log('SaveToLocalStorage');
    localStorage.setItem('canvas_content', JSON.stringify(strokeArr));
}

function loadFromStorage () {
    console.log('load from storage');
    const storedCanvas = JSON.parse(localStorage.getItem('canvas_content'));
    for(let i = 0; i < storedCanvas.length - 1; i++) {
        context.beginPath();
        context.moveTo(storedCanvas[i].x, storedCanvas[i].y);
        context.lineCap = 'round';
        context.strokeStyle = currentColor;
        context.lineTo(storedCanvas[i+1].x, storedCanvas[i+1].y);
        context.stroke();
    }
}

createCanvas();