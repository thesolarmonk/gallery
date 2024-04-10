let camera;

function setup() {
  createCanvas(500, 500);
  camera = createCapture(VIDEO);
  camera.hide();
  camera.size(50, 50);
}

function draw() {
  
  background("#A6C800");
  
  for (let c_x = 0; c_x < 50; c_x++) {
    for (let c_y = 0; c_y < 50; c_y++) {

      let c = camera.get(c_x, c_y);
      let brightness = (c[0] + c[1] + c[2]) / 3;
      
      let x = c_x * 10;
      let y = c_y * 10;
      
      noStroke();

      if (brightness < 80) {
        fill("#013100");
        circle(x, y, 8);
      } else if (brightness >= 80 && brightness < 170) {
        fill("#306012");
        circle(x, y, 5);
      } else {
        fill("#799200");
        circle(x, y, 2);
      }
    }
  }
}
