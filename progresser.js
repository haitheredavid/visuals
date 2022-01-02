class Progresser {
  constructor() {
    this.progress = 0;
    this.direction = false;
    this.increment = 0.1;
  }

  lerpProgress(to, from) {
    return lerp(to, from, this.progress);
  }

  checkGetProgress() {
    this.check();
    return this.progress;
  }

  check() {
    if (this.progress >= 1) {
      this.direction = true;
    } else if (this.progress <= 0) {
      this.direction = false;
    }

    if (!this.direction) {
      this.progress += this.increment;
    } else {
      this.progress -= this.increment;
    }
  }
}
