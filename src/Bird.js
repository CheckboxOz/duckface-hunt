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

    // Random speeds
    this.speed = {
      x: 4 + Math.random() * 8,
      y: 4 + Math.random() * 8
    }

    // 1 for right, -1 for left
    this.dir = {
      x: 1,
      y: 1
    }

    // Animations
    this.image = [
      // left
      spritesheet.get(0, 0, this.width, this.height),
      spritesheet.get(90, 0, this.width, this.height),
      spritesheet.get(180, 0, this.width, this.height),

      // right
      spritesheet.get(270, 0, this.width, this.height),
      spritesheet.get(360, 0, this.width, this.height),
      spritesheet.get(450, 0, this.width, this.height)
    ]
    this.animFrame = 0
    this.animInterval = setInterval(() => {
      this.animFrame++
    }, 250)
  }

  draw() {
    this.animMod = this.dir.x > 0 ? 0 : 3
    image(this.image[(this.animFrame % 3) + this.animMod], this.x, this.y)
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
