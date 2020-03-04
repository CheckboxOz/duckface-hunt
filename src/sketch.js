handsfree = new Handsfree({ weboji: true })

window.preload = function() {}

window.setup = function() {
  let canvas = createCanvas(1280, 769)
  canvas.parent('sketch-container')
  console.log('setup')
}

window.draw = function() {
  background('#3cbcfc')
}
