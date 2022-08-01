import Point from "./point.js";
import Line from "./line.js";
import { Vertex, Middle } from "./point.js";

export default class Canvas {
  constructor() {
    this.canvasDOM = document.getElementById("mainCanvas");
    this.context = this.canvasDOM.getContext("2d");
    this.canvasDOM.width = 1000;
    this.canvasDOM.height = 700;
    this.center = new Point(Math.floor(this.canvasDOM.width / 2), Math.floor(this.canvasDOM.height / 2))
  }
  lines = [];
  clear(wipe = false) {
    this.context.clearRect(0, 0, this.canvasDOM.width, this.canvasDOM.height)
    if(wipe) this.lines = [];
  }

  newLine(a, b) {
    const start = new Point(a.x, a.y);
    const end = new Point(b.x, b.y);
    const line = new Line(start, end);
    this.lines.push(line);
  }
  newLineContinous(a, b) {
    this.lines.push(new Line(a, b, true))
  }

  drawHelper() {
    this.context.beginPath();
    this.context.fillStyle = 'black';
    this.context.fill();
    this.context.font = "14px Arial";
    this.context.fillText("Left Click to move line, Right Click to split line", 700, 660);
    this.context.fillText("Left Click to move vertex", 700, 680);
    this.context.closePath();

    const middleHelper = new Middle(690, 655);
    const vertexHelper = new Vertex(690, 675);
    middleHelper.draw(this.context);
    vertexHelper.draw(this.context);
  }

  drawPolygon(edges, scale) {
    this.clear(true);
    this.drawHelper();
    const slice = (2 * Math.PI) / edges;
    let start = new Point(this.center.x + scale, this.center.y);
    
    for(let i = 1; i <= edges; i++) {
      const angle = slice * i;
      const end = new Point(start.x, start.y);
      start.x = this.center.x + scale * Math.cos(angle);
      start.y = this.center.y + scale * Math.sin(angle);
      
      this.newLineContinous(start, end);
      start = end;
    }
    this.draw();
  }

  draw() {
    this.drawHelper();
    this.lines.forEach((line) => {
      line.draw(this.context);
    })
  }

  findLine(mousePos) {
    for(const line of this.lines) {
      const point = line.pointClicked(mousePos);
      if(point) return {line, point};
    }
    return null;
  }
}