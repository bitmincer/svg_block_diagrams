function Line(draw, points, arrow) {
  this.arrow = arrow;
  this.draw = draw;
  this.points = points;
  this.displacement = 11;
}

Line.prototype.pointsAt = function(to) {
  this.to_shape = to;
}

Line.prototype.create = function() {
  var size = this.points.length;

  var diff_x = this.points[size-1][0] - this.points[size-2][0];
  var diff_y = this.points[size-1][1] - this.points[size-2][1];

  if (Math.abs(diff_x) > Math.abs(diff_y)) {
    if (diff_x > 0) {
      this.direction = "HR";
    } else {
      this.direction = "HL";
      this.arrow_x = this.to_shape.bounds().x2 + this.displacement;
      this.points[size-1][0] = this.arrow_x;
      this.points[size-1][0]--;
    }
  } else {
    if (diff_y > 0) {
      this.direction = "VD";
      this.arrow_y = this.to_shape.bounds().y - this.displacement;
      this.points[size-1][1] = this.arrow_y;
      this.points[size-1][1]++;
    } else {
      this.direction = "VU";
      this.arrow_y = this.to_shape.bounds().y2 + this.displacement;
      this.points[size-1][1] = this.arrow_y;
      this.points[size-1][1]--;
    }
  }

  var arrow = this.draw.polygon().attr({ fill: '#555', 'stroke-width': 0 });

  if (this.direction == "VD") {
    arrow.plot([[-1, 0], [0, 1], [1,0]]);
  } else if (this.direction == "VU") {
    arrow.plot([[-1, 0], [0, -1], [1,0]]);
  } else if (this.direction == "HL") {
    arrow.plot([[0, -1], [-1, 0], [0,1]]);
  }

  arrow.transform({
    x: this.arrow_x || this.points[size-1][0],
    y: this.arrow_y || this.points[size-1][1],
    scaleX: 10,
    scaleY: 10
  });

  var line = this.draw.polyline(this.points).attr({ 'fill-opacity': 0, stroke: '#555', 'stroke-width': 2 });
}
