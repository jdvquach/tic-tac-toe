// WDI29 - Tic Tac Toe
//
//

//Set global variables
let player1Name = "" , player2Name = "", turn = "";
let board = [0,0,0,0,0,0,0,0,0];
let winnerFound = 0, moveCount=0;

//Function to broadcast message
const boardMsg = function (x){
	return $("#board").text(x);
}

//Function to randomly choose player 1 or player 2
const setTurn =function (){
	let randomPlayer = Math.floor((Math.random() * 2) + 1);
	winnerFound=0;
	if ( randomPlayer == 1 ){
		turn = player1Name;
		boardMsg( player1Name+"'s turn now!" );
	}
	else {
		turn = player2Name;
		boardMsg( player2Name+"'s turn now!" );
	}
}
//Initialise at start and on win/draw
const init = function () {
		turn = "";
    board = [0,0,0,0,0,0,0,0,0];
		boardMsg("");
		winnerFound = 0;
		moveCount=0;
}

$("#playButton").click(function () {

	if ( winnerFound == 1 ) {
		init();
	}

	player1Name = $("#player1").val();
	player2Name = $("#player2").val();

	if (player1Name == "" || player2Name == ""){
		alert( "Please set all player names." );
		return;
	}
	setTurn();

});

$(".col").click(function (){

	const id = parseInt( $(this).attr('id') );
	console.log(id);

	board[id] = turn;

	if(player1Name == "" || player2Name == ""){
		alert("Please set all player names.");
		return;
	}
  console.log(board[id]);
	// if (board[id]!== 0) {
	// 	alert("This position is taken. Please try other position.");
	// 	return;
	// }

	if ( winnerFound == 1 ) {
		alert( "Please click play again" );
		return;
	}

	if ( turn == player1Name ) {
		moveCount++;
		$(this).text("O");

		let ifWon = winnerCheck( player1Name );
		if ( !ifWon ) {
			if ( moveCount >= 9 ) {
				boardMsg("Match Drawn!");
				moveCount=0;
				$("#playButton").text("Play again");
				winnerFound = 1;
				return;
			} else
				{
				turn = player2Name;
				boardMsg( player2Name+"'s turn now!" );
			}
			return;
		}
		else {
			return;
		}

	}
	else if ( turn == player2Name ) {
		moveCount++;
		$(this).text("X");
		let ifWon = winnerCheck(player2Name);
		if ( !ifWon ) {
			if( moveCount >= 9 ){
				boardMsg("Match Drawn!");
				moveCount=0;
				init();   //Added tonight
				$("#playButton").text("Play again");
				winnerFound=1;
				return;
			} else
				{
				turn = player1Name;
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
console.log(`WinnerCheck ${playerName} ${board[0]} ${board[1]} ${board[2]}`);
	if (
		 board[0] == playerName && board[1] == playerName && board[2] == playerName ||
		 board[3] == playerName && board[4] == playerName && board[5] == playerName ||
		 board[6] == playerName && board[7] == playerName && board[8] == playerName ||

		 board[0] == playerName && board[3] == playerName && board[6] == playerName ||
		 board[1] == playerName && board[4] == playerName && board[7] == playerName ||
		 board[2] == playerName && board[5] == playerName && board[8] == playerName ||

		 board[0] == playerName && board[4] == playerName && board[8] == playerName ||
		 board[2] == playerName && board[4] == playerName && board[6] == playerName

		 ) {
		boardMsg(playerName+" won the game!");
		winnerFound = 1;
		moveCount = 0;
		init();
		$("#playButton").text("Play again");
		return true;
	}
	return false;
}
