// WDI29 - Tic Tac Toe
//
//Descriptipon - Simple Tic Tac Toe game.

//Set global variables
let player1Name = "" , player2Name = "", currentPlayer = "";
let gameBoard = [0,0,0,0,0,0,0,0,0];
let winnerFound = 0, moveCount=0;
let score1 = 0, score2 = 0;

//Function to broadcast message
let boardMsg = function (x){
	return $("#board").text(x);
}

let scoreMsg = function (x){
	return $(".score1").text(x);
}

let scoreMsg2 = function (x){
	return $(".score2").text(x);
}

scoreMsg(`Player 1:  ${score1}`);
scoreMsg2(`Player 2: ${score2}`);

//Function to randomly choose player 1 or player 2 to go first
const choosePlayer = function () {
	let randomPlayer = Math.floor((Math.random() * 2) + 1);
	winnerFound=0;
	if ( randomPlayer === 1 ){
		currentPlayer = player1Name;
		boardMsg( player1Name+"'s turn now!" );
	}
	else {
		currentPlayer = player2Name;
		boardMsg( player2Name+"'s turn now!" );
	}
}
//Initialise at start and on win/draw
const init = function () {
		currentPlayer = "";
		gameBoard = [0,0,0,0,0,0,0,0,0];
		boardMsg("");
		winnerFound = 0;
		moveCount = 0;
		$('.col').empty();
		scoreMsg(`Player 1:  ${score1}`);
		scoreMsg2(`Player 2: ${score2}`);
}

//Reset the game

$("#resetButton").click(function () {

	score1 = 0;
	score2 = 0;
  init();
	boardMsg("Press 'Play' to start game.");

});

//Game start here
boardMsg("Press 'Play' to start game.");
$("#playButton").click(function () {

	if ( winnerFound === 1 ) {
		init();
	}

	player1Name = $("#player1").val();
	player2Name = $("#player2").val();

	if (player1Name === "" || player2Name === ""){

		boardMsg("Please set Player 1 and 2 names and press 'Play'");
		init();

		return;
	}

	//Radomly choose player 1 or 2
	choosePlayer();

});

//A box is clicked
$(".col").click(function (){

	const id = parseInt( $(this).attr('id') );

	if (gameBoard[id]!== 0) {

		boardMsg( "This box is taken. Try another." );

		return;
	}

// Set the chosen box to the current player

	gameBoard[id] = currentPlayer;

	if ( currentPlayer === player1Name ) {
		moveCount++;
		$(this).text("O");

		let ifWon = winnerCheck( player1Name );
		if ( !ifWon ) {
			if ( moveCount >= 9 ) {
				boardMsg("Match Drawn! Press 'Play' to play again");
				moveCount = 0;
				winnerFound = 1;
				return;
			} else
				{
				currentPlayer = player2Name;
				boardMsg(player2Name+"'s turn now!");
			}
			return;
		}
		else {
			return;
		}

	}
	else if ( currentPlayer === player2Name ) {
		moveCount++;
		$(this).text("X");
		let ifWon = winnerCheck(player2Name);
		if ( !ifWon ) {
			if( moveCount >= 9 ){
				boardMsg("Match Drawn! Press 'Play' to play again");
				moveCount=0;
				winnerFound=1;
				return;
			} else {
				currentPlayer = player1Name;
				boardMsg(player1Name+"'s turn now!");
			}
			return;
		}
		else {
			return;
		}
	}
});

//FOr each turn, check if it's a winning move

const winnerCheck = function ( playerName ) {

	const g = gameBoard;
	if (
		 g[0] === playerName && g[1] === playerName && g[2] === playerName ||
		 g[3] === playerName && g[4] === playerName && g[5] === playerName ||
		 g[6] === playerName && g[7] === playerName && g[8] === playerName ||

		 g[0] === playerName && g[3] === playerName && g[6] === playerName ||
		 g[1] === playerName && g[4] === playerName && g[7] === playerName ||
		 g[2] === playerName && g[5] === playerName && g[8] === playerName ||

		 g[0] === playerName && g[4] === playerName && g[8] === playerName ||
		 g[2] === playerName && g[4] === playerName && g[6] === playerName

		 ) {
		boardMsg(playerName+" won the game. Press 'Play' to play again");
		winnerFound = 1;
		moveCount = 0;
		//$("#playButton").text("Play again");
    // Add game won to count
			if (playerName === player1Name) {
				score1++;
				scoreMsg(`Player 1:  ${score1}`);
			}
				else {
					score2++
					scoreMsg2(`Player 2: ${score2}`);
				}
		return true;
	}
	return false;
}
