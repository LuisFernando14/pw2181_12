var playerTime = 0;
function startGameTime() {
	playerTime = playerTime + 1;
	postMessage(playerTime);
	setTimeout("startGameTime()", 1000); 
}

startGameTime();