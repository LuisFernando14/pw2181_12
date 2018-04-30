function drop (ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log('dadasfas');
    console.log(data);
    ev.target.appendChild(document.getElementById(data));
}
function drag(ev) {
    //Aqui guardamos en el contenedor
    ev.dataTransfer.setData("text", ev.target.id);
}
function allowDrop(ev) {
    //Permita que el objeto caiga sobre él
    ev.preventDefault();
}

function enviarNotificacion(text = "Juego del gato") {
    if(!("Notification" in window)) {
        alert('El navegador no soporta notificaciones');
        return;
    }
    if((Notification.permission === "denied" || Notification.permission === "default")) {
        Notification.requestPermission(function (permission) {
            if(permission === "granted") {
                var notificacion = new Notification(text);
            }
        });
        return;    
    }
    if(Notification.permission === "granted") {
        var notificacion = new Notification(text);
    }
}

$(document).ready(function () {
    var gameTime = 0;
    var timePlayer = 0;
    var gameWorker;
    var playerWorker;
    var cuadricula = [];
    var figuras = [];
    var data = {};
    var position = "";
    var value = "";
    var workedGame = false;
    var turnoJugador = 1;
    //funciona

    function createMatrix() {
        for(var i = 0; i<3; i++) {
            cuadricula[i] = new Array(3);
            for(var j = 0; j<3; j++) {
                cuadricula[i][j] = 0;
            }
        }
    }

    createMatrix();
    function checkMatrix(element) {
        if(diagonalCheck(element)) {
            enviarNotificacion("Ha ganado "+element+" con una estrtegia diagonal. ¡Felicidades!");
            detenerGameWorker();
            detenerPlayerWorker();
            return;
        }
        if(verticalCheck(element)) {
            enviarNotificacion("Ha ganado "+element+" con una estrtegia vertical. ¡Felicidades!");
            detenerGameWorker();
            detenerPlayerWorker();
            return;
        }
        if(horizontalCheck(element)) {
            enviarNotificacion("Ha ganado "+element+" con una estrtegia horizontal. ¡Felicidades!");
            detenerGameWorker();
            detenerPlayerWorker();
            return;
        }
    }

    function diagonalCheck(element) {
        if(cuadricula[0][0] == element && cuadricula[1][1] == element && cuadricula[2][2] == element) {
            return true;
        }

        if(cuadricula[0][2] == element && cuadricula[1][1] == element && cuadricula[2][0] == element) {
            return true;
        }
    }
    function verticalCheck(element) {
        if(cuadricula[0][0] == element && cuadricula[1][0] == element && cuadricula[2][0] == element) {
            return true;
        }

        if(cuadricula[0][1] == element && cuadricula[1][1] == element && cuadricula[2][1] == element) {
            return true;
        }

        if(cuadricula[0][2] == element && cuadricula[1][2] == element && cuadricula[2][2] == element) {
            return true;
        }
    }

    function horizontalCheck(element) {
        if(cuadricula[0][0] == element && cuadricula[0][1] == element && cuadricula[0][2] == element) {
            return true;
        }

        if(cuadricula[1][0] == element && cuadricula[1][1] == element && cuadricula[1][2] == element) {
            return true;
        }

        if(cuadricula[2][0] == element && cuadricula[2][1] == element && cuadricula[2][2] == element) {
            return true;
        }
    }

    function startGameTimer () {
        if(typeof(Worker) == "undefined") {
            alert('El navegador no soporta workers');
            return;
        }
        console.log('hola');
        if(typeof(gameWorker) !== "undefined") {
            console.log('aqui');
            return;
        }
        console.log('jeje');
        gameWorker = new Worker("js/gameWebWorker.js");
        console.log(gameWorker);
        gameWorker.onmessage = function(event) {
            console.log(event.data);
            $('#tiempoTotal').html(event.data);
        }
    }

    function startPlayerTimer () {
        if(typeof(Worker) == "undefined") {
            alert('El navegador no soporta workers');
            return;
        }
        console.log('hola');
        if(typeof(playerWorker) !== "undefined") {
            console.log('aqui');
            return;
        }
        console.log('jeje');
        playerWorker = new Worker("js/playerWebWorker.js");
        console.log(playerWorker);
        playerWorker.onmessage = function(event) {
            console.log(event.data);
            $('#tiempoJugador').html(event.data);
        }
    }

    function detenerGameWorker() {
        if(gameWorker == "undefined")
            return;
        gameWorker.terminate();
        gameWorker = undefined;
    }

    function detenerPlayerWorker() {
        if(typeof(playerWorker) == "undefined")
            return;
        playerWorker.terminate();
        playerWorker = undefined;
    }

    $('.cuadricula').bind("DOMSubtreeModified", function() {
        if(!workedGame) {
            startGameTimer();
        }
        detenerPlayerWorker();
        startPlayerTimer();
        figuras = [];
        var current = $(this).children()[0].attributes["name"].value;
        $('.cuadricula').each(function (i, j) {
            var child = $(this).children()[0];
            position = $(this).attr('name');
            if(typeof(child) !== "undefined") {
                value = child.attributes["name"].value;
                var aux = position.split("-");
                cuadricula[aux[0]][aux[1]] = value;
            }
        });
        /*
        for(var k = 0; k<cuadricula.length; k++) {
            for(var l = 0; l<cuadricula[k].length; l++) {
                console.log(cuadricula[k][l]);
            }
        }
        */
       console.log(current);
       checkMatrix(current);
    });
});