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
    fall: loadSound('assets/duckhunt-fall.wav'),
    music: loadSound('assets/sawsquarenoise_-_02_-_Towel_Defence_Comic.mp3')
  }
  sound.laugh.amp(0.5)
  sound.shot.amp(0.25)
  sound.music.amp(0.5)
}

function setup() {
  let canvas = createCanvas(800, 769)
  canvas.parent('sketch-container')

  sound.music.play()
}

function draw() {
  background('#3cbcfc')

  for (let i = birds.length - 1; i >= 0; i--) {
    birds[i].update()

    if (birds[i].shouldDelete) {
      birds[i].destroy()
      birds.splice(i, 1)

      setTimeout(() => {
        birds.push(new Bird())
      }, 500 + Math.random() * 2500)
    }
  }
}

/**
 * Start the game
 */
function startGame() {
  birds.push(new Bird())
  setTimeout(() => {
    birds.push(new Bird())
  }, Math.random() * 3000 + 1000)

  handsfree.start()
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
// Helper variable to prevent rapid fires due to tracking errors
let shotsFired = false
function checkIfShot(x, y) {
  if (!shotsFired) {
    shotsFired = true
    sound.shot.play()

    setTimeout(() => {
      shotsFired = false
    })
  }

  birds.forEach(bird => {
    if (bird.isFleeing || bird.isDying) return

    if (x > bird.x && x < bird.x + bird.width && y > bird.y && y < bird.y + bird.height) {
      sound.fall.play()
      bird.die()
    }
  })
}
