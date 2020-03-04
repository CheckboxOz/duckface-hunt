let birds = []
let spritesheet
handsfree = new Handsfree({ weboji: true })

function preload() {
  spritesheet = loadImage('/assets/spritesheet.png')
}

function setup() {
  let canvas = createCanvas(1280, 769)
  canvas.parent('sketch-container')
  birds.push(new Bird())
  birds.push(new Bird())
}

function draw() {
  background('#3cbcfc')

  for (let i = birds.length - 1; i >= 0; i--) {
    birds[i].update()

    if (birds[i].shouldDelete) {
      birds.splice(i, 1)
    }
  }
}

/**
 * Shoot with mouse
 */
function mouseClicked() {
  checkIfShot(mouseX, mouseY)
}

/**
 * Shoot with Handsfree
 */
handsfree.use('shoot', ({ weboji }) => {
  if (weboji.pointer.state === 'mouseDown') {
    checkIfShot(weboji.pointer.x, weboji.pointer.y)
  }
})

/**
 * Checks if we shot a bird
 */
function checkIfShot(x, y) {
  birds.forEach(bird => {
    if (x > bird.x && x < bird.x + bird.width && y > bird.y && y < bird.y + bird.height) {
      bird.die()
    }
  })
}
