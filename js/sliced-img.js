var SlicedImg = function(data) {
	var cols = data.columns, rows = data.rows,
		img = document.querySelector(data.img),
		imgParent = img.parentNode,
		col_size = Math.ceil(img.width / cols),
		row_size = Math.ceil(img.height / rows);
		tiles = []
	for(var r = 0; r < rows; r++) {
		for(var c = 0; c < cols; c++) {
			var x = c * col_size,
				y = r * row_size,
				canvas = document.createElement('canvas'),
				drawingSurface = canvas.getContext("2d");
			canvas.width = col_size;
			canvas.height = row_size;
			drawingSurface.drawImage(
				data.canvasImg, x, y, 
				col_size, row_size, 
				0, 0, 
				col_size, row_size
			);			
			tiles.push({
				x: x, y: y,
				random: Math.floor((Math.random() * (cols * rows)) + 1),
				canvas: canvas
			});
		}
	}
	var wall = document.createElement('div');		
	imgParent.replaceChild(wall, img);
	wall.style.width = img.width + 'px';
	wall.style.height = img.height + 'px';
	wall.id = "wall" + Math.floor((Math.random() * 99999999))
	wall.style.position = "relative"

	tiles.forEach(function(elem) {			
		elem.canvas.setAttribute("random", elem.random);
		elem.canvas.style.position = 'absolute';
		elem.canvas.style.top = elem.y + 'px';
		elem.canvas.style.left = elem.x + 'px';
		wall.appendChild(elem.canvas)
	});

	var tilesOut = function() {
		if(data.random) {
			return Array.from(wall.childNodes).sort(function(a, b) {
				return a.getAttribute('random')-b.getAttribute('random');
			})
		} 
		return wall.childNodes;
	}

	return {
		id: wall.id,
		tiles: tilesOut()

	}	
}