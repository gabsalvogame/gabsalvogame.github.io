thegame();

function thegame() {

var highscore = localStorage.getItem("highscore");

var rnd = function() {
	return Math.round(Math.random() * 20);
}

var rows = 25,
	cls = 50,
	by = 20,
	ps = [
		[cls, rnd()],
		[cls + 30, rnd()]
	],
	sc = 0;
var p = [ps[0][0], ps[0][1]];
var tick = setInterval(function() {
	if ((p[0] <= 5 && p[0] >= 1 && (by <= p[1] || (by >= p[1] + 9))) ||
		by <= -1 || by >= 29) clearInterval(tick),
		tick = 0;
	document.getElementById("game").innerHTML = "";
	for (var i = 0; i < rows; i++) {
		s = "";
		for (var j = 0; j < cls; j++) {
			if (((j >= ps[0][0] && j <= ps[0][0] + 10) && (i <= ps[0][1] || i >= ps[0][1] + 10)) ||
				((j >= ps[1][0] && j <= ps[1][0] + 10) && (i <= ps[1][1] || i >= ps[1][1] + 10))) s += "I";
			else if (j >= 11 && j <= 12 && i >= by && i <= by + 5) s += "&diams;";
			else s += ".";
			if (sc % 10 == 0 && sc !== 0) {
				setRandomColor();
			}
			if (tick == 0) {
				    if (sc > highscore) {
				        localStorage.setItem("highscore", sc);
				    }
				document.getElementById("game").innerHTML = "<br /> GAME OVER <br /><br /><br /><br /> Your Score: " + sc + " <br /><br /> Your Highscore: " + highscore + " <br /><br /><br /> Press spacebar to restart the game.<br /> <br /> ";

			}
		}
		document.getElementById("game").innerHTML += s + "\n";
	}
	p[0]--;
	if (ps[0][0]-- < -10) p = [ps[1][0], ps[1][1]], ps[0] = [cls, rnd()], sc++, setRandomColor();
	if (ps[1][0]-- < -10) p = [ps[0][0], ps[0][1]], ps[1] = [cls, rnd()], sc++, setRandomColor();
	by++;
}, 100);
document.onkeyup = function(e) {
	by -= 4;
	if (tick == 0) {
		if (e.keyCode == 32) {
			thegame();
		}
	}
	return false;
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function setRandomColor() {
	document.getElementById("game").style.color = getRandomColor();
}

}