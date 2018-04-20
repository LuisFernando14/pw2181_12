var playerOneTime = 0;
function startPlayerOneTime() {
	playerOneTime = playerOneTime + 1;
	postMessage(playerOneTime);
	setTimeout("startPlayerOneTime()", 1000); 
}
startPlayerOneTime();