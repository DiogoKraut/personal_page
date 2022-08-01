export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
  }

  isInside(a) {
    let v = this.x - a.x;
    let u = this.y - a.y;
    v = v * v;
    u = u * u;
    return Math.sqrt(v + u) < this.radius;
  }
  
}

export class Middle extends Point {
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fillStyle = '#009a68'
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
  }
}

export class Vertex extends Point {
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fillStyle = '#8ED6FF'
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
  }
}
