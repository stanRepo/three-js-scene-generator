import three from "./three.js"
import setup from "../setup.js"
 
export default function (thisImg){
	let canvasBlockImages_jpg = []





var c = document.getElementById("canvas"),
	w = innerWidth,
	h = innerHeight;
    c.width = w;
    c.height = h;
var ctx = c.getContext("2d"),

	
	img = new Image(),
	
	imgW, //px
	imgH, //px 
	imgData,
	tileDim = setup.tileDimension, //tile dimensions px
	tileCountX, //how many tiles we can fit
	tileCountY;
	
	img.src = thisImg.src
	
			//start 
			init();
			var tiles = getTiles();
			drawTiles(tiles);
	


function init() {
	imgW = img.width;
	imgH = img.height;
	//check how many full tiles we can fit
	//right and bottom sides of the image will get cropped
	tileCountX = ~~(imgW / tileDim);
	tileCountY = ~~(imgH / tileDim);

	ctx.drawImage(img, 0, 0);
	imgData = ctx.getImageData(0, 0, imgW, imgH).data;
	ctx.clearRect(0, 0, w, h);
}

//get imgdata index from img px positions
function indexX(x) {
	var i = x * 4;
	if (i > imgData.length) console.warn("X out of bounds");
	return i;
}
function indexY(y) {
	var i = imgW * 4 * y;
	if (i > imgData.length) console.warn("Y out of bounds");
	return i;
}
function getIndex(x, y) {
	var i = indexX(x) + indexY(y);
	if (i > imgData.length) console.warn("XY out of bounds");
	return i;
}

//get a tile of size tileDim*tileDim from position xy
function getTile(x, y) {
	var tile = [];
	//loop over rows
	for (var i = 0; i < tileDim; i++) {
		//slice original image from x to x + tileDim, concat
		tile.push(...imgData.slice(getIndex(x, y + i), getIndex(x + tileDim, y + i)));
	}
	//convert back to typed array and to imgdata object
	tile = new ImageData(new Uint8ClampedArray(tile), tileDim, tileDim);
	//save original position
	tile.x = x;
	tile.y = y;
	return tile;
}

//generate all tiles
function getTiles() {
	var tiles = [];
	for (var yi = 0; yi < tileCountY; yi++) {
		for (var xi = 0; xi < tileCountX; xi++) {
			tiles.push(getTile(xi * tileDim, yi * tileDim));
         
		}
	}
	return tiles;
}





//and draw with offset

function drawTiles(tiles) {
	// console.log(tiles)

    tiles.forEach((d,i) => {
        ctx.putImageData(d, d.x * setup.offsetX, d.y * setup.offsetY) ;
   
   
        const output = document.querySelector('#output')
        const imageData = new ImageData(d.data,setup.tileDimension,setup.tileDimension); // insert tileDim
     
        let blockCanvas = document.createElement('canvas')
        const ctxBlock = blockCanvas.getContext('2d')
        blockCanvas.setAttribute("width", `${setup.tileDimension}px`) // insert Tiledim
        blockCanvas.setAttribute("height", `${setup.tileDimension}px`) // insert Tiledim
        blockCanvas.classList.add('blockCanvas')
     
        ctxBlock.putImageData(imageData, 0,0)
        output.appendChild(blockCanvas)
    
        canvasBlockImages_jpg.push({ 
            tile:blockCanvas.toDataURL("image/jpeg"), 
            x:d.x ,
            y:d.y ,
            tileCountX:tileCountX,
            tileCountY:tileCountY
        })

    });

	
}
return canvasBlockImages_jpg
}