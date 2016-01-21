var SlicedImg = function(options) {
	var cols, 
		rows,
		img,
		imgParent,
		col_size, 
		row_size,
		tiles, 
		tilesAsElems, 
		wall;

	var setImg = function() {
		img  = document.querySelector(options.img);
		if(img === null) 
			throw "IMG not found with *.querySelector("+options.img+")";
		if(img.nodeName !== 'IMG')
			throw "The element is not IMG with *.querySelector("+options.img+")";

		var getNewDataURL = function() {
			var canvasImg = document.createElement('canvas');
			var drawingSurfaceImg = canvasImg.getContext("2d");
			canvasImg.width = img.width;
			canvasImg.height = img.height;
			drawingSurfaceImg.drawImage(
				img, 0, 0,
				img.width, img.height
			);
	 	 	return canvasImg.toDataURL();
		}
		if(options.useSizeImg) {
			img.setAttribute('crossOrigin', 'anonymous');
			img.src = getNewDataURL();
		}
	}

	var setValuesToVars = function() {
		cols = options.columns, rows = options.rows,
		imgParent = img.parentNode
		col_size = Math.ceil(img.width / cols),
		row_size = Math.ceil(img.height / rows);
	}

	var generateTiles = function() {
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
					img,
					x, y, 
					col_size, row_size, 
					0, 0, 
					col_size, row_size
				);				
				var tileToUse = function() {
					var ttu = canvas;
					if(!options.useCanvas) {
						var timg = document.createElement('img');
						timg.setAttribute('crossOrigin', 'anonymous');
						timg.src = canvas.toDataURL();
						ttu = timg;
					}
					return ttu;
				}();
				tiles.push({
					x: x, y: y,
					column: c, row: r,
					random: Math.floor((Math.random() * (cols * rows)) + 1),
					tile: tileToUse
				});
			}
		}
	}

	var fillTheWall = function() {
		wall = document.createElement('div');
		imgParent.replaceChild(wall, img);
		wall.style.width = img.width + 'px';
		wall.style.height = img.height + 'px';
		wall.id = "wall" + Math.floor((Math.random() * 99999999))
		wall.style.position = "relative"
		if(options.className) {
			wall.className = options.className;	
		}
		tiles.forEach(function(elem) {			
			elem.tile.setAttribute("data-random", elem.random);
			elem.tile.setAttribute("data-column", elem.column);
			elem.tile.setAttribute("data-row", elem.row);
			elem.tile.style.position = 'absolute';
			elem.tile.style.top = elem.y + 'px';
			elem.tile.style.left = elem.x + 'px';
			wall.appendChild(elem.tile)
		});
	}
	
	var convertTilesAsDOMElems = function() {
		if(options.random) {
			tilesAsElems = Array.from(wall.childNodes).sort(function(a, b) {
				return a.getAttribute('data-random')-b.getAttribute('data-random');
			});
		} else {
			tilesAsElems = wall.childNodes;
		}
	}
	
	var Main = function() {
		setImg();	
		setValuesToVars();	
		generateTiles();
		fillTheWall();
		convertTilesAsDOMElems();
	}();

	return {
		id: wall.id,
		tiles: tilesAsElems
	}	
}