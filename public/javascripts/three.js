export default function(canvasBlockImages_jpg){

    console.log(canvasBlockImages_jpg)
// Create an empty scene
var scene = new THREE.Scene();


// Create a basic perspective camera
const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
var canvas = document.querySelector('canvas.webgl')
// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer(canvas,{antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
let gY = 0;
let gX= 0;


let positionX = 0;
let positionY = 0

for(let i=0;i<50;i++){
  
    
    const boxWidth = 0.06;
    const boxHeight = 0.06;
    const boxDepth = 0.12;
    const rowLength = 1.04
    let rowCounter = 0;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const loader = new THREE.TextureLoader();
    loader.load(canvasBlockImages_jpg[i], (texture) => {
        const material = new THREE.MeshBasicMaterial({
            map: texture,
        });
        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);

        positionX = positionX + boxWidth // step to right
        positionX.toFixed(1)


      rowCounter + 1;

        console.log(rowCounter)
        if(rowCounter === 10){
            rowCounter = 0 // reset counter
            console.log('firing')
            positionY = positionY + boxHeight
        }

        console.log(positionX, positionY)

      cube.position.set(positionX-2,positionY,0.1)
    })
}

// Render Loop
var render = function () {
    requestAnimationFrame( render );

  // Render the scene
  renderer.render(scene, camera);
};

render();
}