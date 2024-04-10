let camera;

function setup() {
  createCanvas(500, 500);
  camera = createCapture(VIDEO);
  camera.hide();
  camera.size(50, 50);
}

function draw() {
  background(0);
  noStroke();
  
  for (let c_x = 0; c_x < 50; c_x++) {
    for (let c_y = 0; c_y < 50; c_y++) {

      let c = camera.get(c_x, c_y);
      let brightness = (c[0] + c[1] + c[2]) / 3;
      
      let x = c_x * 10;
      let y = c_y * 10;

      if (brightness < 100) {
        fill("#0077FF");
        stroke("#000000");
        circle(x + 5, y + 5, 10);
      } else if (brightness >= 100 && brightness < 200) {
        fill("#F44336");
        stroke("#000000");
        circle(x + 5, y + 5, 10);
      } else {
        fill("#FFEB3B");
        stroke("#000000");
        square(x + 5, y + 5, 10);
      }
    }
  }
}
