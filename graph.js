function Graph(element, width, height, ruler) {
  this.containter = document.getElementById(element);
  this.draw = SVG(this.containter).size(width, height);
  this.lines = [];
  this.shapes = [];
  this.ruler = ruler;
}

Graph.prototype.show = function() {
  this.shapes.forEach(function(shape) { shape.create(); });
  this.lines.forEach(function(line) { line.create(); });
  this.shapes.forEach(function(shape) { shape.bringForward(); });
}

Graph.prototype.addShape = function(klass, x, y, text) {
  var shape = new klass(this.draw, x, y, text);
  this.shapes.push(shape);
  return shape;
};

Graph.prototype.addLineWithArrow = function(to, points) {
  var line = new Line(this.draw, points, true);
  line.pointsAt(to);
  this.lines.push(line);
  return line;
}

Graph.prototype.p = function(x) {
  return x * this.ruler;
}
