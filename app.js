/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as they wish. Each result gets added to players ROUND score.
- BUT, if the player rolls a 1, all their ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. After that, it's the next player's turn.
- The first player to reach 100 points on the GLOBAL score wins the game.

*/

var scores, roundScore, activePlayer, gamePlaying;

init();





document.querySelector(".btn-roll").addEventListener("click", function() {
	if(gamePlaying) {
		// 1. Random number
	var dice = Math.floor(Math.random() * 6) + 1;

	// 2. Display the result
	var diceDOM = 	document.querySelector(".dice");
	diceDOM.style.display = "block";
	diceDOM.src = "dice-" + dice + ".png";



	// 3. Update round score only IF the rolled number was NOT a 1
	if(dice !== 1) {
	// Add score
	roundScore += dice;
	document.querySelector("#current-" + activePlayer).textContent = roundScore;
	} else {
		// Next Player
		nextPlayer();

	}
	}

	
});




document.querySelector(".btn-hold").addEventListener("click", function() {
	if(gamePlaying) {
	// Add CURRENT score to GLOBAL score
	scores[activePlayer] += roundScore;


	// Update UI
	document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

	// Check if player won game
	if(scores[activePlayer] >= 100) {
		document.querySelector("#name-" + activePlayer).textContent = "Winner!";
		document.querySelector(".dice").style.display = "none";
		document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
		document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
		gamePlaying = false;
	}	else {
		// Next Player
		nextPlayer();
	}
	}
	
	

});




function nextPlayer() {
	// Next Player
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.getElementById("current-0").textContent = "0";
		document.getElementById("current-1").textContent = "0";


		document.querySelector(".player-0-panel").classList.toggle("active");
		document.querySelector(".player-1-panel").classList.toggle("active");

		// document.querySelector(".player-0-panel").classList.remove("active");
		// document.querySelector(".player-1-panel").classList.add("active");

		document.querySelector(".dice").style.display = "none";
};


document.querySelector(".btn-new").addEventListener("click", init);


function init() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.querySelector(".dice").style.display = "none";

	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";

	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";

	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
}



// // document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>"

// var x = document.querySelector("#score-0").textContent;
// console.log(x);
