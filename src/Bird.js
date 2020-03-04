class Bird {
  constructor() {
    this.width = 90
    this.height = 90

    // Starting side
    if (Math.random() < 0.5) {
      this.x = 0 - this.width
    } else {
      this.x = width
    }
    this.y = Math.floor(Math.random() * height)

    this.speed = {
      x: 8 + Math.random() * 4,
      y: 8 + Math.random() * 4
    }
    this.dir = {
      x: 1,
      y: 1
    }
  }

  draw() {
    rect(this.x, this.y, this.width, this.height)
  }

  update() {
    this.x += this.speed.x * this.dir.x
    this.y += this.speed.y * this.dir.y

    if (this.x < 0) {
      this.dir.x = 1
    } else if (this.x + this.width > width) {
      this.dir.x = -1
    }
    if (this.y < 0) {
      this.dir.y = 1
    } else if (this.y + this.height > 600) {
      this.dir.y = -1
    }

    this.draw()
  }
}

window.Bird = Bird
