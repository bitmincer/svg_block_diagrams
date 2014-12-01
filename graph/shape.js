function Shape(draw, x, y, text) {
  this.draw = draw;
  this.text = text;
  this.x = x;
  this.y = y;
  this.h_margin = this.v_margin = 16;
  this.border = 2;
  this.scale = 1.0;
  this.group = draw.group();
};

Shape.prototype.hMargin = function() {
  return this.h_margin;
}

Shape.prototype.vMargin = function() {
  return this.v_margin;
}

Shape.prototype.hBounds = function() {
  return {
    x: this.x - this.width / 2,
    x2: this.x + this.width / 2
  };
}

Shape.prototype.vBounds = function() {
  return {
    y: this.y - this.height / 2,
    y2: this.y + this.height / 2
  };
}

Shape.prototype.bounds = function() {
  var retObj = {};
  for (var k in this.vBounds()) { retObj[k] = this.vBounds()[k]; }
  for (var k in this.hBounds()) { retObj[k] = this.hBounds()[k]; }
  return retObj;
}

Shape.prototype.bringForward = function() {
  this.group.front();
}

Shape.prototype.create = function() {
  var split_text = this.text.split("\n");
  var fontsize = 14;

  // A little skewed text
  var text = this.draw.text(function(add) {
    split_text.forEach(function(line) {
      add.tspan(line).newLine();
    });

  });


  text.leading(1.0);

  text.attr({ 'font-size': fontsize });

  this.text_width = text.bbox().width;
  this.text_height = text.bbox().height;//(split_text.length) * fontsize;

  this.width = this.text_width + this.hMargin();
  this.height = this.text_height + this.vMargin();

  this.width *= this.scale;
  this.height *= this.scale;

  var shape = this.shape = this.getShape();

  text.front();

  shape.width(this.width);
  shape.height(this.height);

  shape.transform({
    x: this.x - this.width / 2,
    y: this.y - this.height / 2
  });

  var x_margin = ( this.width - this.text_width ) / 2;
  var y_margin = ( this.height - this.text_height ) / 2;


  text.transform({
    x: this.x - this.width / 2 + x_margin,
    y: this.y - this.height / 2 + y_margin
  });

  this.group.add(shape);
  this.group.add(text);
};

// DataBlock

function DataBlock(draw, x, y, text) {
    // Parent constructor
    Shape.call(this, draw, x, y, text);
    this.h_margin *= 3;
}

DataBlock.prototype = Object.create(Shape.prototype);

DataBlock.prototype.getShape = function() {
  var shape = this.draw.polygon().attr({ fill: '#fff', stroke: '#f06', 'stroke-width': this.border });
  shape.plot([[0, this.height], [this.width, this.height], [10 + this.width, 0], [10, 0]]);
  return shape;
}

DataBlock.prototype.hBounds = function() {
  return {
    x: this.x - this.width / 2 + 5,
    x2: this.x + this.width / 2 - 5
  };
}

// TerminatorBlock

function TerminatorBlock(draw, x, y, text) {
    // Parent constructor
    Shape.call(this, draw, x, y, text);
}

TerminatorBlock.prototype = Object.create(Shape.prototype);

TerminatorBlock.prototype.getShape = function() {
  var shape = this.draw.rect(1,1).attr({ rx: 10, fill: '#fff', stroke: '#06d', 'stroke-width': this.border });
  return shape;
}

// ProcessBlock

function ProcessBlock(draw, x, y, text) {
    // Parent constructor
    Shape.call(this, draw, x, y, text);
}

ProcessBlock.prototype = Object.create(Shape.prototype);

ProcessBlock.prototype.getShape = function() {
  var shape = this.draw.rect(1,1).attr({ rx: 0, fill: '#fff', stroke: '#f60', 'stroke-width': this.border });
  return shape;
}

// DecisionBlock

function DecisionBlock(draw, x, y, text) {
    // Parent constructor
    Shape.call(this, draw, x, y, text);
    this.h_margin = 0;
    this.v_margin = 40;
    this.scale = 1.5;
}

DecisionBlock.prototype = Object.create(Shape.prototype);

DecisionBlock.prototype.getShape = function() {
  var shape = this.draw.polygon().attr({ fill: '#fff', stroke: '#0a2', 'stroke-width': this.border });
  shape.plot([[0, 0.5], [0.5, 0], [1, 0.5], [0.5, 1]]);
  return shape;
}

// Text

function TextAnnotation(draw, x, y, text) {
    // Parent constructor
    Shape.call(this, draw, x, y, text);
}

TextAnnotation.prototype = Object.create(Shape.prototype);

TextAnnotation.prototype.getShape = function() {
  var shape = this.draw.polygon().attr({ fill: '#fff', stroke: '#0a2', 'stroke-width': 0 });
  shape.plot([[0, 0.5], [0.5, 0], [1, 0.5], [0.5, 1]]);
  return shape;
}

