class Figura {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  mostrar() {}//polimorfismo
  
  mover() {
    this.y += 2;
  }
  
  destruir() {}//polimorfismo
}

// Subclases de Figura
class Circulo extends Figura { //clase que hereda de figura
  constructor(x, y) {
    super(x, y, color(255, 0, 0));
    this.diametro = 25;
  }

  mostrar() { //se aplica el polimorfismo
    noStroke(); //sin trazo
    fill(this.color);
    ellipse(this.x, this.y, this.diametro, this.diametro);
  }
  
  destruir() {
    this.diametro = 0;
  }

}
class Triangulo extends Figura {
  constructor(x, y) {
    super(x, y, color(0, 30, 100));
  }

  mostrar() {
    noStroke();
    fill(this.color);
    triangle(this.x - 15, this.y + 15, this.x + 15, this.y + 15, this.x, this.y - 15);
  }
  
  destruir() {
    this.y = -100;
  }
}

// Variables globales
let figuras = [];
let derrota = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(20);
  
  // Crear nuevas figuras de forma aleatoria
  if(frameCount % 40 === 0) {
    let eleccion = Math.floor(random(3));
  
    if(eleccion === 0) {
      figuras.push(new Circulo(random(width), 0)); //circulo
    } else if(eleccion === 1) {
    } else {
      figuras.push(new Triangulo(random(width), 0)); //triangulo
    }
  }
  
  // Mover y mostrar figuras existentes
  for(let i = 0; i < figuras.length; i++) {
    figuras[i].mostrar();
    figuras[i].mover();
    
    if(figuras[i].y > height + 20) {
      derrota = true;
      break;
    }
  }
  
  // Mostrar mensaje de PERDISTE
  if(derrota) {
    fill(200, 0, 0);
    textSize(30);
    text("¡PERDISTE!", width/2 - 30, height/2);
    noLoop(); // hace que la funcion dentro de drawn se ejecute solo una vez
  }
}

function mousePressed() {
  // Verificar si se hace click en alguna figura para eliminar la figura
  for(let i = 0; i < figuras.length; i++) {
    let d = dist(mouseX, mouseY, figuras[i].x, figuras[i].y);
    if(d < 20) {
      figuras[i].destruir();
    }
  }
}