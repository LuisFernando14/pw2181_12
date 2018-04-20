var playerTwoTime = 0;
function startPlayerTwoTime() {
	playerTwoTime = playerTwoTime + 1;
	postMessage(playerTwoTime);
	setTimeout("startPlayerTwoTime()", 1000); 
}
startPlayerTwoTime();