//array con todos los colores
var buttonColors = ["red", "blue", "green", "yellow"];

//array del patron generado por el juego
var gamePattern = [];

//array de donde clico el usuario
var userClickedPattern = [];

//variable en la que se guarda si se a iniciado o no el juego
var started = false;

//variable que contiene el nivel
var level = 0;

//cuando se detecte la primera tecla inicia el juego, cambia el titulo y started para a ser verdadero
$(document).keydown(function(){
    if(!started){

        $("#level-title").text("Level " + level);
        nextSecuence();
        started = true;
    }
})

//selecciono todos los botones y agrego el evento de click para que detecte donde se pulso
$(".btn").click(function () {
    
    //guardo el ID en la variable
    var userChosenColor = $(this).attr("id");

    //meto la ID en el array
    userClickedPattern.push(userChosenColor);

    //inicio el sonido
    playSound(userChosenColor);

    //se resalta el color seleccionado
    animatePress(userChosenColor);

    //llamo a la funcion para chequear la respuesta
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});

function nextSecuence() {

    //aumento el nivel cada vez que es llamada la funcion
    level++;

    //cambio el titulo cada vez que es llamada la funcion
    $("#level-title").text("Level " + level);
    
    //creo una variable que contenga un numero random
    var randomNumber = Math.floor(Math.random() * 4);

    //selecciono el color dentro del array con el numero generado y lo meto en otra variable
    var randomChosenColor = buttonColors[randomNumber];

    //meto el color que a salido en el array
    gamePattern.push(randomChosenColor);

    //genero una animacion para los colores
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //inicio el sonido
    playSound(randomChosenColor);

}

function playSound(input) {

    //creo la variable en la que guardo el sonido basado en el color generado
    var audio = new Audio("sounds/" + input + ".mp3");

    //inicio el sonido
    audio.play();
}

function animatePress(currentColor) {

    //agrego la clase al boton del color seleccionado
    $("#" + currentColor).addClass("pressed");

    //quito la clase al boton despues de un tiempo
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    
}

function checkAnswer(currentLevel) {

    //chequeo si el patron es el mismo
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        //chequeo si tiene la misma longitud
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(() => {
            nextSecuence();
        }, 1000);

        //reseteo el patron del usuario
        userClickedPattern = [];
    }
    }   else {

        //lanzo el audio de error
        var error = new Audio("sounds/wrong.mp3");

        error.play();

        //hago la animacion del pantallazo
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        //cambio el titulo
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //llamo a la funcion de reset
        startover();

    }

}

function startover() {
    
    //reseteo los valores
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];

}