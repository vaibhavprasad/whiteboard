const { body } = document;
const canvasContainer = document.getElementsByClassName('white-board')[0];
const canvas = document.createElement('canvas');
canvas.id = 'canvas';
const context = canvas.getContext('2d');

let isMouseDown = false;

const boardColor = '#ffffff';
const currentColor = '#000000';

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
        // console.log('mouse move called', currentMousePosition);
    }
});
createCanvas();