class Jugador{

    constructor(app, name, color){
        this.app = app;
        this.name = name;
        this.color = color;

        this.pos = new p5.Vector(0, 0);
        this.tam = 50;
        this.vel = 10;

        this.rastro = [];
    }

    mover(){
        var mouse = new p5.Vector(this.app.mouseX, this.app.mouseY);
        var dist = mouse.dist(this.pos);

        if(dist > 2){
            this.rastro.push(this.pos.copy());
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

    pintar(){
        this.app.strokeJoin(this.app.ROUND);
        this.app.noFill();
        this.app.stroke(this.color);
        this.app.strokeWeight(10);
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
}