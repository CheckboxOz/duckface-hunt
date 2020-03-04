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
      x: 3 + Math.random() * 4,
      y: 3 + Math.random() * 4
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
      spritesheet.get(450, 0, this.width, this.height),

      // flying up
      spritesheet.get(0, 180, this.width, this.height),
      spritesheet.get(90, 180, this.width, this.height),
      spritesheet.get(180, 180, this.width, this.height),

      // Shot
      spritesheet.get(0, 270, this.width, this.height),

      // dying
      spritesheet.get(90, 270, this.width, this.height),
      spritesheet.get(180, 270, this.width, this.height)
    ]
    this.animFrame = 0
    this.animInterval = setInterval(() => {
      this.animFrame++
    }, 250)

    // How long this bird stays on the screen
    this.timeTillFlee = Math.floor(Math.random() * 6) + 6
    this.timeTillFleeInterval = setInterval(() => {
      --this.timeTillFlee
      if (!this.timeTillFlee && !this.isDying) {
        this.flee()
      }
    }, 1000)

    sound.quack.play()
  }

  /**
   * Draw the sprite
   */
  draw() {
    this.animMod = this.dir.x > 0 ? 0 : 3

    if (!this.isFleeing && !this.isDying) {
      image(this.image[(this.animFrame % 3) + this.animMod], this.x, this.y)
    } else if (this.isDying) {
      image(this.image[(this.animFrame % 2) + 10], this.x, this.y)
    } else {
      image(this.image[(this.animFrame % 3) + 6], this.x, this.y)
    }
  }

  /**
   * Update coordinates
   */
  update() {
    this.x += this.speed.x * this.dir.x
    this.y += this.speed.y * this.dir.y

    if (!this.isFleeing && !this.isDying) {
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
    }

    this.draw()
  }

  /**
   * Leave the scene
   */
  flee() {
    this.isFleeing = true
    this.speed.x = 0
    this.speed.y = -8
    this.dir.y = 1

    sound.laugh.play()

    setTimeout(() => {
      birds.push(new Bird())
    }, 500 + Math.random() * 2500)
  }

  /**
   * Fall into the ground
   */
  die() {
    this.isDying = true
    this.speed.x = 0
    this.speed.y = 8
    this.dir.y = 1

    setTimeout(() => {
      birds.push(new Bird())
    }, 500 + Math.random() * 2500)
  }

  /**
   * Free memory
   */
  destroy() {
    clearInterval(this.timeTillFleeInterval)
    clearInterval(this.animInterval)
  }
}
