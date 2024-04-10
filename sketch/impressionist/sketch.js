let camera;

function setup() {
  createCanvas(500, 500);
  camera = createCapture(VIDEO);
  camera.hide();
  camera.size(40, 40);
}

function draw() {


  for(let i = 0; i < 500; i++) {
    const x = int(random(0, 40));
    const y = int(random(0, 40));
    const r = int(random(5, 20));

    let c = camera.get(x, y);
    let brightness = (c[0] + c[1] + c[2]) / 3;

    fill(c);
    noStroke();
    circle(x * 12.5, y * 12.5, r);
  }
}