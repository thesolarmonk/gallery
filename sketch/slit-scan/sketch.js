// state
let y = 0

// assets
let camera

function setup() {
    createCanvas(500, 500)
    camera = createCapture(VIDEO)
    camera.hide()
    camera.size(500, 500)
}

function draw() {
    stroke(0, 30)
    line(0, y, width, y)

    image(camera, 0, y, width, 1, 0, y, width, 1)
    image(camera, 0, y + 1, width, height - (y + 1), 0, y + 1, width, height - (y + 1))

    y += 1
    y = y % height
}
