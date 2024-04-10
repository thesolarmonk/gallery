// assets
let starry

function setup() {
    createCanvas(500, 500)
    starry = loadImage('assets/starry.jpg')
    background('#5487AC')
}

function draw() {
    for (let i = 0; i < 50; i++) {
        const x = int(random(0, width))
        const y = int(random(0, height))
        const r = int(random(3, 12))

        let c = starry.get(x, y)

        fill(c)
        noStroke()
        circle(x, y, r)
    }
}
