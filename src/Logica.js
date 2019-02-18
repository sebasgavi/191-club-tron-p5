class Logica{
    
    constructor(app, color, nombre){
        this.app = app;

        this.app.createCanvas(window.innerWidth, window.innerHeight);

        this.jugadores = [];
        
        firebase.database().ref().on('child_added', ( snap ) => {
            let jugador = snap.val();
            if(jugador.nombre != nombre){
                let jug = new Jugador(this.app, jugador.nombre, jugador.color);
                this.jugadores.push(jug);
                jug.escucharMovimiento();
                // nuevo jugador -> escuchar
            }
        });

        this.miJugador = new Jugador(this.app, nombre, color);
    }

    pintar(){
        this.app.background(220);

        this.miJugador.seguirMouse();
        this.miJugador.pintar();

        this.jugadores.forEach(jug => {
            jug.pintar();
        });
    }

}