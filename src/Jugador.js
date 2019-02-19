class Jugador{

    constructor(app, name, color){
        this.app = app;
        this.name = name;
        this.color = color;

        this.ref = firebase.database().ref('/' + this.name + '/rastro');

        this.dejandoRastro = false;
        this.pos = new p5.Vector(0, 0);
        this.tam = 20;
        this.vel = 6;

        this.rastro = [];
    }

    escucharMovimiento(){
        // escuchar a nuevas posiciones de los otros jugadores
        this.ref.on('child_added', (snapshot) => {
            let temp = snapshot.val();
            this.pos = new p5.Vector(temp.x, temp.y);
            this.rastro.push(this.pos.copy());
        });
    }

    seguirMouse(){
        var mouse = new p5.Vector(this.app.mouseX, this.app.mouseY);
        var dist = mouse.dist(this.pos);

        if(this.dejandoRastro && dist > 2){
            this.rastro.push(this.pos.copy());

            // enviando posiciones de miJugador
            this.ref.push({
                x: this.pos.x,
                y: this.pos.y
            });
        }

        if(dist <= this.vel){
            this.pos.set(mouse);
            return;
        }

        var dir = p5.Vector.sub(mouse, this.pos);
        dir.normalize();
        dir.mult(this.vel);
        this.pos.add(dir);
    }

    validarMuerte(jugadores){
        jugadores.some(jug => {
            jug.rastro.some(otroPos => {
                if(this.pos.dist(otroPos) < this.vel){
                    //alert('PERDISTE ');
                }
            })
        });
    }

    pintar(){
        this.app.strokeJoin(this.app.ROUND);
        this.app.noFill();
        this.app.stroke(this.color);
        this.app.strokeWeight(this.tam * .6);
        this.app.beginShape();
        for (let i = 0; i < this.rastro.length; i++) {
            const element = this.rastro[i];
            //this.app.ellipse(element.x, element.y, 4, 4);
            this.app.vertex(element.x, element.y);
        }
        this.app.endShape();

        this.app.noStroke();
        this.app.fill(this.color);
        this.app.ellipse(this.pos.x, this.pos.y, this.tam, this.tam);
        this.app.text(this.name, this.pos.x, this.pos.y + 40);
    }

    iniciarRastro(){
        this.dejandoRastro = true;
    }
}