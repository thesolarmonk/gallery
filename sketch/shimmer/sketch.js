// levers
const levels = 50

function setup() {
    createCanvas(500, 500)
}

function draw() {
    const x = map(mouseX, 0, width, width / 2 - 30, width / 2 + 30)
    const y = map(mouseY, 0, height, height / 2 - 30, height / 2 + 30)

    background('#fffffff')
    noFill()
    strokeWeight(14)

    // first set of circles
    for (let i = 0; i < levels; i++) {
        stroke('#FF9800')
        circle(x, y, i * 40)
    }

    // second set of circles
    for (let i = 0; i < levels; i++) {
        stroke('#FFEB3B')
        circle(y, x, i * 40)
    }
}
