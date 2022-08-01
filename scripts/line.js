import Point from "./point.js";

export default class Line {
  constructor(start, end, test = false) {
    if(test) {
      this.start = start;
      this.end = end;
    } else {
      this.start = new Point(start.x, start.y, 'point');
      this.end = new Point(end.x, end.y, 'point');
    }
    this.mid = new Point((start.x + end.x)/2, (start.y + end.y)/2, 'middle')
  }

  calculateMiddle() {
    this.mid.x = (this.start.x + this.end.x)/2;
    this.mid.y = (this.start.y + this.end.y)/2;
  }

  draw(ctx) {
    this.calculateMiddle();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.closePath();
    
    this.start.draw(ctx);
    this.mid.draw(ctx);
    this.end.draw(ctx);
  }

  pointClicked(mousePos) {
    if(this.start.isInside(mousePos)) {
      return this.start;
    } else if(this.mid.isInside(mousePos)) {
      return this.mid;
    } else if(this.end.isInside(mousePos)) {
      return this.end;
    }
    return null;
  }

  move(pos) {
    const diffX = pos.x - this.mid.x;
    const diffY = pos.y - this.mid.y;

    this.start.move({x: this.start.x + diffX, y: this.start.y + diffY});
    this.end.move({x: this.end.x + diffX, y: this.end.y + diffY});
    this.calculateMiddle();

  }

  split(canvas) {
    if(this.end.type == 'Point') {
      canvas.newLineContinous(this.start, this.mid);
      canvas.newLineContinous(this.mid, this.end);
      canvas.removeLine(this);
    }
    canvas.newLine(this.mid, this.end);
    this.end.move(this.mid);
    this.calculateMiddle();
  }
}