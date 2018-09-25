let player1Name="" , player2Name="", turn = "";
// let board =  [[0,0,0],[0,0,0],[0,0,0]];
let board =  [0,0,0,0,0,0,0,0,0];
let winnerFound = 0, moveCount=0;

const boardMsg = function (x){
	return $("#board").text(x);
}

const setTurn =function (){
	let r = Math.floor((Math.random() * 2) + 1);
	winnerFound=0;
	if(r==1){
		turn = player1Name;
		boardMsg(player1Name+"'s turn now!");
	}
	else{
		turn = player2Name;
		boardMsg(player2Name+"'s turn now!");
	}
}

const init = function (){
		turn = "";
		// board =  [[0,0,0],[0,0,0],[0,0,0]];
    board =  [0,0,0,0,0,0,0,0,0];
		boardMsg("");
		// $(".col").map(function() {
    // 		$(this).text("");
		// }).get();
		winnerFound = 0;
		moveCount=0;
}

$("#playButton").click(function (){

	if(winnerFound==1){
		init();
	}

	player1Name = $("#player1").val();
	player2Name = $("#player2").val();

	if(player1Name=="" || player2Name==""){
		alert("Please set player all the names.");
		return;
	}

	setTurn();

});

$(".col").click(function (){

  let boxIndex = alert( $(".col").index(this) +1 );  //Just want to know what the index is for the box clicked.
  console.log(boxIndex);    //Why  not showing in console log? Undefined
	if(player1Name=="" || player2Name==""){
		alert("Please set player all the names.");
		return;
	}

	let row = $(this).parent().index();

	let col = $(this).index();

	console.log(this.row,this.col);

	if(board[row][col]!==0){
		alert("This position is taken. Please try other position.");
		return;
	}
	if(winnerFound==1){
		alert("Please click play again");
		return;
	}

	if(turn==player1Name){
		moveCount++;
		$(this).text("O");
		board[row][col] = 1;
		let ifWon = winnerCheck(1,player1Name);
		if(!ifWon){
			if(moveCount>=9){
				boardMsg("Match Drawn!");
				moveCount=0;
				$("#playButton").text("Play again");
				winnerFound=1;
				return;
			}else{
				turn = player2Name;
				boardMsg(player2Name+"'s turn now!");
			}
			return;
		}
		else{
			return;
		}

	}
	else if(turn==player2Name){
		moveCount++;
		$(this).text("X");
		board[row][col] = 2;
		let ifWon = winnerCheck(2,player2Name);
		if(!ifWon){
			if(moveCount>=9){
				boardMsg("Match Drawn!");
				moveCount=0;
				$("#playButton").text("Play again");
				winnerFound=1;
				return;
			}else{
				turn = player1Name;
				boardMsg(player1Name+"'s turn now!");
			}
			return;
		}
		else{
			return;
		}

	}

});

const winnerCheck = function (n,playerName){

	let winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
	if(


		(board[0][0]==n && board[0][1]==n && board[0][2]==n) ||
		(board[1][0]==n && board[1][1]==n && board[1][2]==n) ||
		(board[2][0]==n && board[2][1]==n && board[2][2]==n) ||

		(board[0][0]==n && board[1][0]==n && board[2][0]==n) ||
		(board[0][1]==n && board[1][1]==n && board[2][1]==n) ||
		(board[0][2]==n && board[1][2]==n && board[2][2]==n) ||

		(board[0][0]==n && board[1][1]==n && board[2][2]==n)||
		(board[0][2]==n && board[1][1]==n && board[2][0]==n)


		){
		boardMsg(playerName+" won the game!");
		winnerFound = 1;
		moveCount=0;
		$("#playButton").text("Play again");
		return true;
	}
	return false;
}
