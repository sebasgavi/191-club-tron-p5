var app = new Vue({
    el: '#app',
    data: {
      message: 'No has seleccionado un color',
      color: '#00ff08',
      nombre: 'gavi',
      yaInicio: false,
    },
    methods: {
        onCambioNombre: function(event){
            this.nombre = event.target.value;
        },
        onCambioColor: function(event){
            this.color = event.target.value;
            console.log('cambio', this.color);
        },
        onIniciar: function(){
            if(this.color && !this.yaInicio) {
                console.log('iniciar', this.color);
                this.yaInicio = true;
                iniciarJuego(this.color, this.nombre);
            }
        }
    }
});

function iniciarJuego(color, nombre){
    new p5(function(sketch){
        var logica;
    
        sketch.setup = function(){
            logica = new Logica(sketch, color, nombre);
        }
        
        sketch.draw = function(){
            logica.pintar();
        }

        sketch.mousePressed = function(){
            logica.pressed();
        }
    });
}