// WDI29 - Tic Tac Toe
//
//

//Set global variables
let player1Name = "" , player2Name = "", currentPlayer = "";
let gameBoard = [0,0,0,0,0,0,0,0,0];
let winnerFound = 0, moveCount=0;

//Function to broadcast message
let boardMsg = function (x){
	return $("#board").text(x);
}

//Function to randomly choose player 1 or player 2
const setTurn = function () {
	let randomPlayer = Math.floor((Math.random() * 2) + 1);
	winnerFound=0;
	if ( randomPlayer == 1 ){
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
}

$("#playButton").click(function () {

	if ( winnerFound == 1 ) {
		init();
	}

	player1Name = $("#player1").val();
	player2Name = $("#player2").val();

	if (player1Name == "" || player2Name == ""){
		alert( "Please set Player 1 and 2 names and press 'Play'." );
		return;
	}
	setTurn();

});

$(".col").click(function (){

	const id = parseInt( $(this).attr('id') );
	console.log(id);

	if (gameBoard[id]!== 0) {
		alert("This position is taken. Please try other position.");
		return;
	}

// Set the chosen box to the current player
	gameBoard[id] = currentPlayer;
	console.log(gameBoard[id]);

	if (player1Name == "" || player2Name == "") {
		alert("Please set Player 1 and 2 names and press 'Play'.");
		return;
	}

	if ( winnerFound == 1 ) {
		alert( "Please click play again" );
		return;
	}

	if ( currentPlayer == player1Name ) {
		moveCount++;
		$(this).text("O");

		let ifWon = winnerCheck( player1Name );
		if ( !ifWon ) {
			if ( moveCount >= 9 ) {
				boardMsg("Match Drawn!");
				moveCount = 0;

				// $("#playButton").text("Play again");

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
	else if ( currentPlayer == player2Name ) {
		moveCount++;
		$(this).text("X");
		let ifWon = winnerCheck(player2Name);
		if ( !ifWon ) {
			if( moveCount >= 9 ){
				boardMsg("Match Drawn!");
				moveCount=0;
				// $("#playButton").text("Play again");
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

const winnerCheck = function ( playerName ) {
	console.log(`WinnerCheck ${playerName} ${gameBoard[0]} ${gameBoard[1]} ${gameBoard[2]}`);
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
		boardMsg(playerName+" won the game!");
		winnerFound = 1;
		moveCount = 0;
		// debugger
		console.log('GOT HERE');
		$("#playButton").text("Play again");

		return true;
	}
	return false;
}
