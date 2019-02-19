class Logica{
    
    constructor(app, color, nombre){
        this.app = app;

        this.app.createCanvas(window.innerWidth, window.innerHeight);

        this.jugadores = [];
        
        firebase.database().ref().on('child_added', ( snap ) => {
            let jugador = snap.val();
            if(jugador.nombre != nombre){
                // crea nuevo jugador
                let jug = new Jugador(this.app, jugador.nombre, jugador.color);
                // agrega el jugador al arreglo de jugadores
                this.jugadores.push(jug);
                // empieza a escuchar el movimiento
                jug.escucharMovimiento();
            }
        });

        firebase.database().ref().on('child_removed', (snap) => {
            // toma el nombre de la referencia eliminada
            let nombreEliminado = snap.val().nombre;
            // recorre el arreglo de jugadores hasta que retorna true
            this.jugadores.some((jug, index) => {
                if(jug.name === nombreEliminado){
                    // si el nombre del jugador es el mismo eliminado se remueve del arreglo
                    this.jugadores.splice(index, 1);
                    // retorna true para salir del loop
                    return true;
                }
            });
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

    pressed(){
        this.miJugador.iniciarRastro();
    }

}