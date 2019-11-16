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
	radius = radius * 0.90

}