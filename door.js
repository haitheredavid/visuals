class Door {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.currentSize = 0;
    }
  
    move(offset) {
      this.currentSize = lerp(50, this.size, offset);
      this.x = this.x + random(-1, 1);
      this.y = this.y + random(-1, 1);
    }
  
    display() {
      // stroke(255);
      fill(255, 150);
      rect(this.x, this.y, this.size, this.currentSize);
    }
  
    moveDispaly(offset) {
      this.move(offset);
      this.display();
    }
  }
  