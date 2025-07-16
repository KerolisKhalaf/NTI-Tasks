class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error("Cannot instantiate abstract class Shape");
    }
  }

  area() {
    throw new Error("Must be implemented by subclass");
  }

  perimeter() {
    throw new Error("Must be implemented by subclass");
  }

  toString() {
    return `Area: ${this.area()}, Perimeter: ${this.perimeter()}`;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }

  toString() {
    return `Rectangle - ${super.toString()}`;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
    this.side = side;
  }

  toString() {
    return `Square - ${super.toString()}`;
  }
}

class Circle extends Rectangle {
  constructor(radius) {
    super(0, 0);
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  toString() {
    return `Circle - ${super.toString()}`;
  }
}

export { Rectangle, Square, Circle };
