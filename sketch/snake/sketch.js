//  GRID
let n_rows = 15;
let n_cols = 15;

let dir;
let score;

// STATE
let canvas;
let grid;
let snake;
let fruit;

function setup() {
   canvas = createCanvas(500, 500);
   new_game(canvas);
}

function draw() {
  colorMode(HSL);
  background(
    (200 + score * 15) % 255,
    100,
    score > 0 ? 96 : 100
  );
  colorMode(RGB);
  
  noStroke();
  translate(15, 15);
  
  if(frameCount % 10 === 0) {
    let state = snake.move(fruit);
    switch(state) {
      case 'EATEN':
        score++;
        break;
        
      case 'DEAD':
        new_game();
        break;
      
      case 'ALIVE':
      case 'WAITING':
        break;
    }
  }
  
  grid.paint();
  fruit.paint();
  snake.paint();
  
  score_paint();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if(dir !== 'RIGHT') dir = 'LEFT';
  } else if (keyCode === RIGHT_ARROW) {
    if(dir !== 'LEFT') dir = 'RIGHT';
  } else if (keyCode === UP_ARROW) {
    if(dir !== 'DOWN') dir = 'UP';
  } else if (keyCode === DOWN_ARROW) {
    if(dir !== 'UP') dir = 'DOWN';
  }
}

function new_game() {
  score = 0;
  dir = 'NONE'
  grid = new Grid(canvas, n_rows, n_cols);
  snake = new Snake(grid);
  fruit = new Fruit(grid, snake);
}

function score_paint() {
  textFont('Helvetica');
  textStyle(BOLD);
  textSize(25);
  textAlign(RIGHT);
  text(score, width -25, 15);
}

class Grid {
  constructor(canvas, n_rows, n_cols) {
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.n_rows = n_rows;
    this.n_cols = n_cols;
    
    this.cell_width = this.width / this.n_rows;
    this.cell_height = this.height / this.n_cols;
  }

  paint() {
    colorMode(HSB);

    for (let row = 0; row < this.n_rows; row++) {
      for (let col = 0; col < this.n_cols; col++) {

        let x = row * this.cell_width;
        let y = col * this.cell_height;

        // grid cells get larger when the mouse is closer
        let distance = dist(x, y, mouseX, mouseY);
        let r = map(distance, 0, 150, 14, 7, true);

        fill(
          (200 + score * 15) % 255,
          35,
          score > 0 ? 100 : 100
        );
        circle(x, y, r);
      }
    }
    
    colorMode(RGB);
  }
}

class Snake {
  constructor(grid) {
    this.grid = grid;
    
    this.parts = [];
    this.parts.push(this.new_part(10, 10));
    this.parts.push(this.new_part(10, 11));
    this.parts.push(this.new_part(10, 12));
  }

  move(fruit) {
    
    if(dir === 'NONE') return 'WAITING';
    
    let head = this.parts[0];
    let new_head = this.new_part(head.x, head.y);
    
    switch(dir) {
      case 'UP':
        new_head = this.new_part(head.x, head.y - 1);
        break;
      
      case 'DOWN':
        new_head = this.new_part(head.x, head.y + 1);
        break;
        
      case 'LEFT':
        new_head = this.new_part(head.x - 1, head.y);
        break;
        
      case 'RIGHT':
        new_head = this.new_part(head.x + 1, head.y);
        break;
        
      default:
          break;
    }
    
    if(new_head.x < 0 || new_head.x >= n_cols || new_head.y < 0 || new_head.y >= n_rows) {
      return 'DEAD';
    }
    
    let has_eaten_self = this.is_eating_self(new_head);
    if(has_eaten_self) {
      return 'DEAD';
    }
    
    let has_eaten_fruit = this.is_eating_fruit(new_head, fruit);
    if(has_eaten_fruit) {
      this.parts = [new_head, ...this.parts];
      fruit.new_fruit();
      return 'EATEN';
    } else {
      this.parts = [new_head, ...this.parts.slice(0, -1)];
      return 'ALIVE';
    }
  }

  paint() {
    for (const part of this.parts) {
      fill("#000000");

      circle(
        part.x * this.grid.cell_width,
        part.y * this.grid.cell_height,
        20
      );
    }
  }
  
  new_part(x, y) {
    return {x: x, y: y};
  }
  
  is_eating_fruit(new_head, fruit) {
    return (new_head.x === fruit.x && new_head.y === fruit.y);
  }
  
  is_eating_self(new_head) {
    for (const part of this.parts) {
      if(new_head.x === part.x && new_head.y === part.y) {
        return true;
      }
    }
    
    return false;
  }
}

class Fruit {
  constructor(grid, snake) {
    this.grid = grid;
    this.snake = snake;
    
    this.x = 0;
    this.y = 0;
    
    this.new_fruit();
  }
  
  new_fruit() {
    let x;
    let y;
    
    let fruit_overlapping = true;
  
    while(fruit_overlapping) {
      
      fruit_overlapping = false;
      x = int(random(0, n_rows));
      y = int(random(0, n_cols));
      
      for (const part of this.snake.parts) {
        if (part.x == x && part.y == y) {
          fruit_overlapping = true;
        }
      }
    }
    
    this.x = x;
    this.y = y;
  }

  paint() {
    fill("#F44336");
    
    let r = 16 + sin(frameCount/30) * 2.5;
    
    circle(
      this.x * this.grid.cell_width,
      this.y * this.grid.cell_height,
      r
    );
  }
}


