let fazendeiroX;
let vegetais = []; // Array para armazenar objetos de vegetais
let pragas = []; // Array para armazenar objetos de pragas
let lixos = []; // Array para armazenar objetos de lixo
let pontuacao = 0;
let tempoRestante = 60; // Segundos
let jogoRodando = true;

function setup() {
  createCanvas(600, 400);
  fazendeiroX = width / 2;
  // Carregar imagens aqui (opcional)
  setInterval(contarTempo, 1000); // Chama a função a cada segundo
  setInterval(gerarItens, 2000); // Gera novos itens a cada 2 segundos
}

function draw() {
  background(135, 206, 235); // Céu azul
  fill(139, 69, 19); // Cor da terra
  rect(0, height - 50, width, 50); // Chão da horta

  if (jogoRodando) {
    // Desenhar fazendeiro
    fill(255, 0, 0);
    rect(fazendeiroX, height - 100, 30, 50); // Simples retângulo para o fazendeiro

    // Atualizar e desenhar vegetais
    for (let i = vegetais.length - 1; i >= 0; i--) {
      let v = vegetais[i];
      v.move();
      v.display();
      if (v.passouDaTela()) {
        vegetais.splice(i, 1); // Remove o vegetal se ele passou da tela
      }
    }

    // Atualizar e desenhar pragas
    for (let i = pragas.length - 1; i >= 0; i--) {
        let p = pragas[i];
        p.move();
        p.display();
        if (p.passouDaTela()) {
            pontuacao -= 10; // Penalidade por praga no chão
            pragas.splice(i, 1);
        }
    }

    // Atualizar e desenhar lixos
    for (let i = lixos.length - 1; i >= 0; i--) {
        let l = lixos[i];
        l.move();
        l.display();
        if (l.passouDaTela()) {
            pontuacao -= 10; // Penalidade por lixo no chão
            lixos.splice(i, 1);
        }
    }

    // Exibir placar e tempo
    fill(0);
    textSize(16);
    text("Pontos: " + pontuacao, 10, 20);
    text("Tempo: " + tempoRestante, width - 100, 20);

  } else {
    // Tela de Game Over
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Fim de Jogo!", width / 2, height / 2 - 20);
    textSize(24);
    text("Sua pontuação final: " + pontuacao, width / 2, height / 2 + 20);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    fazendeiroX -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    fazendeiroX += 10;
  } else if (key === ' ') { // Barra de espaço para ação
    // Verificar colisão com vegetais, pragas e lixos
    for (let i = vegetais.length - 1; i >= 0; i--) {
      let v = vegetais[i];
      if (dist(fazendeiroX, height - 100, v.x, v.y) < 30) { // Exemplo de colisão
        if (v.maduro) {
          pontuacao += 10;
        } else {
          pontuacao -= 5;
        }
        vegetais.splice(i, 1); // Remove o vegetal
      }
    }
    for (let i = pragas.length - 1; i >= 0; i--) {
        let p = pragas[i];
        if (dist(fazendeiroX, height - 100, p.x, p.y) < 30) {
            pragas.splice(i, 1); // Remove a praga
        }
    }
    for (let i = lixos.length - 1; i >= 0; i--) {
        let l = lixos[i];
        if (dist(fazendeiroX, height - 100, l.x, l.y) < 30) {
            lixos.splice(i, 1); // Remove o lixo
        }
    }
  }
}

function contarTempo() {
  if (jogoRodando) {
    tempoRestante--;
    if (tempoRestante <= 0) {
      jogoRodando = false;
    }
  }
}

function gerarItens() {
    if (jogoRodando) {
        // Gerar vegetais, pragas e lixos aleatoriamente
        let tipoItem = floor(random(3)); // 0 = vegetal, 1 = praga, 2 = lixo
        let xPos = random(width);
        if (tipoItem === 0) {
            vegetais.push(new Vegetal(xPos, 0, random() > 0.5)); // true para maduro, false para imaturo
        } else if (tipoItem === 1) {
            pragas.push(new Praga(xPos, 0));
        } else {
            lixos.push(new Lixo(xPos, 0));
        }
    }
}

// Classes para Vegetal, Praga e Lixo (com métodos move, display, passouDaTela)
class Vegetal {
  constructor(x, y, maduro) {
    this.x = x;
    this.y = y;
    this.maduro = maduro;
  }
  move() {
    this.y += 1; // Move para baixo
  }
  display() {
    if (this.maduro) {
      fill(0, 200, 0); // Verde para vegetal maduro
    } else {
      fill(100, 150, 100); // Verde mais claro para imaturo
    }
    ellipse(this.x, this.y, 20, 30); // Desenha um oval para o vegetal
  }
  passouDaTela() {
    return this.y > height;
  }
}

class Praga {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move() {
        this.y += 1.5; // Pragas se movem um pouco mais rápido
    }
    display() {
        fill(150, 0, 150); // Cor roxa para a praga
        rect(this.x, this.y, 15, 15); // Desenha um quadrado para a praga
    }
    passouDaTela() {
        return this.y > height;
    }
}

class Lixo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move() {
        this.y += 1.2; // Lixo se move em velocidade média
    }
    display() {
        fill(100); // Cor cinza para o lixo
        rect(this.x, this.y, 20, 20); // Desenha um quadrado para o lixo
    }
    passouDaTela() {
        return this.y > height;
    }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}