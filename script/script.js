document.addEventListener("DOMContentLoaded", init);
function init() {
	
/* te zmienne muszą być dostępne dla wielu funkcji */
	let canvas = document.getElementById("canvasElement");
	let context = canvas.getContext("2d");
	let radius = canvas.height / 2;
	/* wielkość radius będzie punkten odniesienia do innych wielkości - elementy będą realtywne */

	/* przesunięcie, by środek koła był w środku elementu canvas */
	context.translate(radius * 2, radius);
	/* wielkość koła tarczy nieco mniejsza od całości */
	radius = radius * 0.90;

/* uruchomienie funkcji w interwale 1 sekundy rysuje wciąż nową godzinę, a właściwie sekundę */
	setInterval(drawClock, 1000);

/* funkcja wywołująca trzy pozostałe */
	function drawClock() {
		drawFace(context, radius); /* tarcza zegara */
		drawNumbers(context, radius); /* liczby na tarczy zagara */
		drawTime(context, radius); /* położenie wskazówek zegara */
	}

/* funkcja rysująca tarczę zegara */
	function drawFace(context, radius) {
		let grad;

		context.beginPath();

  		context.arc(0, 0, radius, 0, 2 * Math.PI);
  		context.fillStyle = '#fff';
  		context.fill();

  		grad = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.1);
  		/* obwódka zegara dla efektu 3D */
  		grad.addColorStop(0, '#451111');
  		grad.addColorStop(0.5, '#fff');
  		grad.addColorStop(1, '#451111');
  		context.strokeStyle = grad; 
  		context.lineWidth = radius * 0.12; /* szerokość obwódki */
  		context.stroke();
  		/* punkt środkowy zegara */
  		context.beginPath();
  		context.arc(0, 0, radius * 0.06, 0, 2 * Math.PI);
  		context.fillStyle = '#451111';
  		context.fill();
	}

/* funkcja rysująca liczby na tarczy zegara */
	function drawNumbers(context, radius) {
		let numAngle;
  		let clockNumber;
  		/* font dla liczb na tarczy zegara: */
  		context.font = radius * 0.15 + "px Arial";
  		/* niewielkie przesunięcie liczb ku środkowi tarczy zegara */
  		context.textBaseline = "middle";
  		/* wyśrodkowanie liczb na tarczy: */
  		context.textAlign = "center";
  		/* rozmieszczenie liczb wokół tarczy zegara */
  		for (clockNumber = 1; clockNumber < 13; clockNumber++) {
   			numAngle = clockNumber * Math.PI / 6;
    		context.rotate(numAngle);
    		context.translate(0, -radius * 0.85);
    		context.rotate(-numAngle);
    		context.fillText(clockNumber.toString(), 0, 0);
    		context.rotate(numAngle);
    		context.translate(0, radius * 0.85);
    		context.rotate(-numAngle);
  		}

	}

/* funkcja pobierająca bieżący czas i definiująca położenie wskazówek zegara */
	function drawTime(context, radius) {
		let now = new Date(); 				/* nowa instancja obiektu bieżącego czasu */
  		let hour = now.getHours(); 			/* bieżąca godzina */
  		let minute = now.getMinutes();		/* bieżąca minuta */
  		let second = now.getSeconds();		/* bieżąca sekunda */

  		/* wskazówka godzinowa: */
  		hour = hour % 12; /* liczba całkowita podzialna przez 12 */
  		hour = (hour * Math.PI / 6) + ( minute * Math.PI / (6 * 60) ) + ( second * Math.PI / (360 * 60) );
  		drawHand(context, hour, radius * 0.55, radius * 0.08);
  		/* wskazówka minutowa: */
  		minute = (minute * Math.PI / 30) + ( second * Math.PI / (30 * 60) );
  		drawHand(context, minute, radius * 0.75, radius * 0.06);
  		/* wskazówka sekundowa: */
  		second = (second * Math.PI / 30);
  		drawHand(context, second, radius * 0.85, radius * 0.02);
	}

/* funkcja rysująca wskazówki zegara */
	function drawHand(context, pos, length, width) {
  		context.beginPath();
  		context.lineWidth = width;
  		context.lineCap = "round"; /* okrągłe zakończenie linii */
  		context.moveTo(0, 0);
  		context.rotate(pos);
  		context.lineTo(0, -length);
  		context.stroke();
  		context.rotate(-pos);
	}


/* zmień zegar na cyfrowy */
	let changeButton = document.getElementById("changeButton");
	changeButton.addEventListener("click", changeTheClock);
	
	function changeTheClock() {
		let canvasContainer = document.getElementById("canvasContainer");
		let digitalClock = document.getElementById("digitalClock");
		let titleBanner = document.getElementById("titleBanner");

	/* jeśli w canvas nie ma takiej klasy, dodaj ją i wyświetl zegar cyfrowy */
		if ( !canvasContainer.classList.contains("makeInvisible") ) {
			canvasContainer.classList.add("makeInvisible");
			digitalClock.classList.add("makeVisible");
			digitalClock.style.fontSize = "10vw";
			digitalClock.style.marginLeft = "31vw";
		
		/* zmień tekst na tytule */
			titleBanner.innerText = "...or as digital clock";
		/* wyświetl zegar cyfrowy */
			let myTimeVariable = setInterval(myTimer, 1000);
			function myTimer() {
 				let currentTime = new Date();
  				let myCurrentTimeDisplayed = currentTime.toLocaleTimeString();
  				digitalClock.innerHTML = myCurrentTimeDisplayed;
			}
		/* zmień tekst na przycisku */
			changeButton.innerText = "RESTORE CLASSIC CLOCK";
		}
	/* jeśli w canvas jest taka klasa, usuń ją i wyświetl zegar na canvas */
		else if ( canvasContainer.classList.contains("makeInvisible") ) {
			canvasContainer.classList.remove("makeInvisible");
			digitalClock.classList.remove("makeVisible");
			digitalClock.classList.add("makeInvisible");

		/* zmień tekst na tytule */
			titleBanner.innerText = "clock build as canvas element";
		/* zmień tekst na przycisku */
			changeButton.innerText = "CHANGE THE CLOCK FOR DIGITAL";
			clearInterval("myTimeVariable");
		}	
	}


}





