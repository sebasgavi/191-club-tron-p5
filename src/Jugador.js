class Jugador{

    constructor(app, name){
        this.app = app;
        this.name = name;

        this.pos = new p5.Vector(0, 0);
        this.tam = 50;
        this.vel = 10;

        this.rastro = [];

        this.db = firebase.database();
        this.ref = this.db.ref(name ? name : '/gavi');
        if(!this.name) this.ref.remove();

        if(this.name) this.ref.on('child_added', (snapshot) => {
            var val = snapshot.val();
            this.rastro.push(new p5.Vector(val.x, val.y));
        });
    }

    mover(){
        var mouse = new p5.Vector(this.app.mouseX, this.app.mouseY);
        var dist = mouse.dist(this.pos);

        if(!this.name && dist > 2){
            this.rastro.push(this.pos.copy());
            this.ref.push({
                x: this.pos.x,
                y: this.pos.y,
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

    pintar(){
        this.app.strokeJoin(this.app.ROUND);
        this.app.noFill();
        this.app.stroke(0);
        this.app.strokeWeight(10);
        this.app.beginShape();
        for (let i = 0; i < this.rastro.length; i++) {
            const element = this.rastro[i];
            //this.app.ellipse(element.x, element.y, 4, 4);
            this.app.vertex(element.x, element.y);
        }
        this.app.endShape();

        this.app.noStroke();
        this.app.fill(200,20,20);
        this.app.ellipse(this.pos.x, this.pos.y, this.tam, this.tam);
    }
}