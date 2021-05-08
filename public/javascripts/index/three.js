import setup from '../setup.js'

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
renderer.setPixelRatio(window.devicePixelRatio || 1);
renderer.setClearColor(0x161216)

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );


(function initThree(){
    window.addEventListener('resize', resize, { passive: true
    })
})()

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material

const group = new THREE.Group();

for(let i=0;i<canvasBlockImages_jpg.length;i++){
  
    
    const boxWidth = 0.1;
    const boxHeight = 0.1;
    const boxDepth = 0.1;
  
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const loader = new THREE.TextureLoader();
    const texture1 = loader.load(canvasBlockImages_jpg[i].tile, (texture) => {
        // texture.rotation = 90;
        texture.needsUpdate = true
    })

        var material = [
            new THREE.MeshBasicMaterial({
                color: new THREE.Color("rgb(252, 232, 213)") //left
            }),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color("rgb(244, 226, 211)") //right
            }),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color("rgb(202, 124, 123)") // top
            }),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color("rgb(220, 129, 128)") // bottom
            }),
            new THREE.MeshBasicMaterial({ // front
                map: texture1,
            }),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color("rgb(255, 255, 255)") //back
            })
        ];
       
        const cube = new THREE.Mesh(geometry, material);

 // rearrange the tiles so the image is correctly rendered
        const totalLengthPixels = canvasBlockImages_jpg[i].tileCountY * setup.tileDimension
        canvasBlockImages_jpg[i].y = (canvasBlockImages_jpg[i].y - totalLengthPixels) * -1


      // set position
        cube.position.set(
        (canvasBlockImages_jpg[i].x/500 -1) * setup.offsetX, // x axis
        (canvasBlockImages_jpg[i].y/500 -1)* setup.offsetY, // y axis
        0.0001 // set on same z-axis
        )
        group.add(cube); // add to group
}

scene.add(group)
// Render Loop
var render = function () {
    requestAnimationFrame( render );


    group.children.forEach((child, i)=>{

        // child.rotation.y += 0.01 * i / 10
        // child.rotation.x += 0.01 * i / 10
        child.rotation.y += 0.01
        child.rotation.x += 0.02
    })

  // Render the scene
  renderer.render(scene, camera);
};

function resize () {
    renderer.width = window.innerWidth;
    renderer.height = window.innerHeight;
    renderer.setSize(renderer.width, renderer.height);
    camera.aspect = renderer.width / renderer.height;
    camera.updateProjectionMatrix();
  }
render();

}