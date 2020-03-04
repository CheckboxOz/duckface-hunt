let birds = []
let spritesheet
handsfree = new Handsfree({ weboji: true })

preload = function() {
  spritesheet = loadImage('/assets/spritesheet.png')
}

setup = function() {
  let canvas = createCanvas(1280, 769)
  canvas.parent('sketch-container')
  birds.push(new Bird())
  birds.push(new Bird())
}

draw = function() {
  background('#3cbcfc')

  birds.forEach(bird => {
    bird.update()
  })
}
