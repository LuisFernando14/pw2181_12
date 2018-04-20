var gameTime = 0;
var timePlayerOne = 0;
var timePlayerTwo = 0;
var workerGame;
var workerPlayerOne;
var workerPlayerTwo;



function startGameTimer () {
    if(typeof(Worker) == "undefined") {
        alert('El navegador no soporta workers');
    }
    if(typeof(workerGame) != "undefined") {
        return;
    }
    workerGame = new Worker('gameWebWorker.js');
    workerGame.onmessage = function(event) {
        document.getElementById('tiempoTotal').innerHTML = event.data;
    }
}

function startTimerPlayerOne () {
    if(typeof(Worker) == "undefined") {
        alert('El navegador no soporta workers');
    }
    if(typeof(workerPlayerOne) != "undefined") {
        return;
    }
    workerPlayerOne = new Worker('playerOneGame.js');
    workerPlayerOne.onmessage = function(event) {
        document.getElementById('tiempoTotalJugador1').innerHTML = event.data;
    }
}

function startTimerPlayerTwo () {
    if(typeof(Worker) == "undefined") {
        alert('El navegador no soporta workers');
    }
    if(typeof(workerPlayerTwo) != "undefined") {
        return;
    }
    workerPlayerTwo = new Worker('playerTwoTime.js');
    workerPlayerTwo.onmessage = function(event) {
        document.getElementById('tiempoTotalJugador2').innerHTML = event.data;
    }
}

function stopGameTimer () {
    workerGame.terminate();
    workerGame = undefined;
}

function stopTimerPlayerOne () {
    workerPlayerOne.terminate();
    workerPlayerOne = undefined;
}

function stopTimerPlayerTwo () {
    workerPlayerTwo.terminate();
    workerPlayerTwo = undefined;
}