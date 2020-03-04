let birds = []
let spritesheet
let sound
handsfree = new Handsfree({ weboji: true })

function preload() {
  spritesheet = loadImage('/assets/spritesheet.png')

  sound = {
    shot: loadSound('assets/duckhunt-shot.wav'),
    quack: loadSound('assets/duckhunt-quack.wav'),
    laugh: loadSound('assets/duckhunt-laugh.wav'),
    fall: loadSound('assets/duckhunt-fall.wav')
  }
  sound.shot.amp(0.25)
}

function setup() {
  let canvas = createCanvas(1280, 769)
  canvas.parent('sketch-container')
  birds.push(new Bird())
  setTimeout(() => {
    birds.push(new Bird())
  }, Math.random() * 3000 + 1000)
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
  sound.shot.play()

  birds.forEach(bird => {
    if (x > bird.x && x < bird.x + bird.width && y > bird.y && y < bird.y + bird.height) {
      sound.fall.play()
      bird.die()
    }
  })
}
