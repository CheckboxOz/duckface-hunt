let birds = []
handsfree = new Handsfree({ weboji: true })

window.preload = function() {}

window.setup = function() {
  let canvas = createCanvas(1280, 769)
  canvas.parent('sketch-container')
  birds.push(new Bird())
}

window.draw = function() {
  background('#3cbcfc')

  birds.forEach(bird => {
    bird.update()
  })
}
