var gameTime = 0;
function startGameTime() {
	gameTime = gameTime + 1;
	postMessage(gameTime);
	setTimeout("startGameTime()", 1000); 
}
startGameTime();