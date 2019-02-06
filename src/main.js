new p5(function(sketch){

    var logica;

    sketch.setup = function(){
        logica = new Logica(sketch);
    }
    
    sketch.draw = function(){
        logica.pintar();
    }

});