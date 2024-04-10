// assets
let starry_night
let signac

// state
let pressed = false

function setup() {
    const cnv = createCanvas(500, 500)
    starry_night = loadImage('assets/starry_night.jpg')
    signac = loadImage('assets/signac.png')

    cnv.mouseClicked(() => {
        pressed = !pressed
    })
}

function draw() {
    let x = mouseX
    let y = mouseY

    for (let i = 0; i < 40; i++) {
        let rand_x = int(random(-40, 40))
        let rand_y = int(random(-40, 40))
        let rand_size = int(random(1, 5))

        let sample_color

        if (pressed) {
            sample_color = starry_night.get(x + rand_x, y + rand_y)
        } else {
            sample_color = signac.get(x + rand_x, y + rand_y)
        }

        fill(sample_color)
        noStroke()

        circle(x + rand_x, y + rand_y, rand_size)
    }
}
