class Logica{
    
    constructor(app){
        this.app = app;

        this.app.createCanvas(window.innerWidth, window.innerHeight);
        
        this.jugadorA = new Jugador(this.app);
        this.jugadorB = new Jugador(this.app, 'MueranPutos');
    }

    pintar(){
        this.app.background(220);

        this.jugadorA.mover();
        this.jugadorA.pintar();

        this.jugadorB.mover();
        this.jugadorB.pintar();
    }

}