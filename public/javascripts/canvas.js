import three from "./three.js"
import setup from "./setup.js"
 
var toBase64 = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
];
 
function uintbase64(src) {
    let dstLen = Math.ceil(src.length * 4 / 3);
    let dst = new Array(dstLen);
    let pos = 0;
    let dstIndex = 0;
    let nextLeft = 0;
    src.forEach( b => {
        let r = 0;
        if (pos == 0) {
            r = b >> 2;
            dst[dstIndex++] = toBase64[nextLeft + r];
            nextLeft = (b & 0x03) << 4;
        } else if (pos == 1) {
            r = b >> 4;
            dst[dstIndex++] = toBase64[nextLeft + r];
            nextLeft = (b & 0x0F) << 2;
        } else if (pos == 2) {
            r = b >> 6;
            dst[dstIndex++] = toBase64[nextLeft + r];
            dst[dstIndex++] = toBase64[b & 0x3F];
            nextLeft = 0;
        }
 
        pos++;
        if (pos == 3) {
            pos = 0;
        }
    });
 
    if (pos != 0) {
        dst[dstIndex] = toBase64[nextLeft];
    }
 
    return dst.join('');
}



var c = document.getElementById("canvas"),
	w = innerWidth,
	h = innerHeight;
c.width = w;
c.height = h;
var ctx = c.getContext("2d"),
	input = document.getElementById("input"),
	reader = new FileReader(),
	img = new Image(),
	imgW, //px
	imgH, //px 
	imgData,
	tileDim = setup.tileDimension, //tile dimensions px
	tileCountX, //how many tiles we can fit
	tileCountY;



//read file input
input.onchange = function() {
	reader.readAsDataURL(input.files[0]);
	reader.onload = function() {
		img.src = reader.result;
		img.onload = function() {
			//start 
			init();
			var tiles = getTiles();
			drawTiles(tiles);
		}
	}
}

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




let canvasBlockImages_jpg = []
//and draw with offset
var offset = 1.0;
function drawTiles(tiles) {
	console.log(tiles)

    tiles.forEach((d,i) => {
        ctx.putImageData(d, d.x * offset, d.y * offset) ;
   
        var base64 = uintbase64(d.data)
 
        const output = document.querySelector('#output')
        const imageData = new ImageData(d.data,setup.tileDimension,setup.tileDimension); // insert tileDim
     
        let blockCanvas = document.createElement('canvas')
        const ctxBlock = blockCanvas.getContext('2d')
        blockCanvas.setAttribute("width", `${setup.tileDimension}px`) // insert Tiledim
        blockCanvas.setAttribute("height", `${setup.tileDimension}px`) // insert Tiledim
        blockCanvas.classList.add('blockCanvas')
        // console.log(imageData)
        ctxBlock.putImageData(imageData, 0,0)
        output.appendChild(blockCanvas)
    
        canvasBlockImages_jpg.push({ 
            tile:blockCanvas.toDataURL("image/jpeg"), 
            x:d.x ,
            y:d.y ,
            offset:offset,
            tileCountX:tileCountX,
            tileCountY:tileCountY
        })

// const newImg = document.createElement('img')
// img.src = blockCanvas.toDataURL()
// output.appendChild(newImg)
        // debugger;
    });

    // console.log(canvasBlockImages_PNG)

   
	three(canvasBlockImages_jpg)




	//more interesting effects are easy to do:
	//tiles.forEach((d,i) => ctx.putImageData(d, d.x * i * 0.01, d.y * i * 0.01));
	
	//for efficiency in animation etc tiles should be converted to image object
}