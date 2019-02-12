class Logica{
    
    constructor(app, color, nombre){
        this.app = app;

        this.app.createCanvas(window.innerWidth, window.innerHeight);

        this.jugadores = [];
        
        firebase.database().ref().on('child_added', ( snap ) => {
            let jugador = snap.val();
            if(jugador.nombre != nombre){
                this.jugadores.push(new Jugador(this.app, jugador.nombre, jugador.color));
            }
        });

        this.jugadorA = new Jugador(this.app, nombre, color);
    }

    pintar(){
        this.app.background(220);

        this.jugadorA.mover();
        this.jugadorA.pintar();

        this.jugadores.forEach(jug => {
            jug.pintar();
        });
    }

}