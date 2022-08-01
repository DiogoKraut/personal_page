export default class Point {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.radius = 7;
    this.type = type;
  }

  isInside(a) {
    let v = this.x - a.x;
    let u = this.y - a.y;
    v = v * v;
    u = u * u;
    return Math.sqrt(v + u) < this.radius;
  }
  
  move(pos) {
    this.x = pos.x;
    this.y = pos.y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    if(this.type == 'vertex') ctx.fillStyle = '#f48225';
    if(this.type == 'middle') ctx.fillStyle = '#009a68';
    if(this.type == 'point')  ctx.fillStyle = '#8ED6FF';
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
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
