import Canvas from './canvas.js';
import Line from './line.js'
import Point from './point.js';

let selection;

function draw() {
  const canvas = new Canvas();
  const submit = document.getElementById("submit");
  const lineCount = document.getElementById("lineCount");

  canvas.newLine({x: 15, y: 15}, {x: 100, y: 100})
  canvas.newLine({x: 100, y: 100}, {x: 400, y: 130})
  canvas.clear();
  canvas.draw();

  canvas.canvasDOM.addEventListener('mousedown', (e) => {
    if(e.button != 0 && e.button != 2) return;
    const mousePos = new Point(e.offsetX, e.offsetY, 'vertex');
    selection = canvas.findLine(mousePos);
    if(e.button == 2) {
      if(selection?.point?.type == 'middle') {
        selection.line.split(canvas);
        canvas.clear();
        canvas.draw();
        selection = null;
      }
    }
  })
  
  canvas.canvasDOM.addEventListener('mousemove', (e) => {
    const mousePos = new Point(e.offsetX, e.offsetY, 'vertex');
    // console.log(mousePos)
    if(!selection) return;
    switch (selection?.point?.type) {
      case 'point':
      case 'vertex':
        selection.point.move(mousePos);
        selection.line.calculateMiddle();
        canvas.clear();
        canvas.draw();
        break;
      case 'middle':
        selection.line.move(mousePos);
        canvas.clear();
        canvas.draw();
      default:
        break;
    }
  });

  canvas.canvasDOM.addEventListener('mouseup', (e) => {
    selection = null;
  });

  submit.addEventListener('click', (e) => {
    if(lineCount.value >= 3) {
      canvas.drawPolygon(lineCount.value, 200);
    }
  })
}

draw();