
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
    loader.load(canvasBlockImages_jpg[i].tile, (texture) => {
        // texture.rotation = 90;


        var material = [
            new THREE.MeshBasicMaterial({
                map: texture //left
            }),
            new THREE.MeshBasicMaterial({
                color: 'orange' //right
            }),
            new THREE.MeshBasicMaterial({
                color: 'green' // top
            }),
            new THREE.MeshBasicMaterial({
                color: 'blue' // bottom
            }),
            new THREE.MeshBasicMaterial({
                map: texture,
            }),
            new THREE.MeshBasicMaterial({
                color: 'yellow' //back
            })
        ];
       
        const cube = new THREE.Mesh(geometry, material);

        
        switch(canvasBlockImages_jpg[i].y){
            case 0:
                canvasBlockImages_jpg[i].y = 850
                break;
            case 850:
                canvasBlockImages_jpg[i].y = 0
                break;
            case 50:
                canvasBlockImages_jpg[i].y = 800
                break;
            case 100:
                canvasBlockImages_jpg[i].y = 750
                break;
            case 150:
                canvasBlockImages_jpg[i].y = 700
                break;
            case 200:
                canvasBlockImages_jpg[i].y = 650
                break;
            case 250:
                canvasBlockImages_jpg[i].y = 600
                break;
            case 300:
                canvasBlockImages_jpg[i].y = 550
                break;
            case 350:
                canvasBlockImages_jpg[i].y = 500
                break;
            case 400:
                canvasBlockImages_jpg[i].y = 450
                break;
            case 450:
                canvasBlockImages_jpg[i].y = 400
                break;
            case 500:
                canvasBlockImages_jpg[i].y = 350
                break;
            case 550:
                canvasBlockImages_jpg[i].y = 300
                break;
            case 600:
                canvasBlockImages_jpg[i].y = 250
                break;
            case 650:
                canvasBlockImages_jpg[i].y = 200
                break;
            case 700:
                canvasBlockImages_jpg[i].y = 150
                break;
            case 750:
                canvasBlockImages_jpg[i].y = 100
                break;
            case 800:
                canvasBlockImages_jpg[i].y = 50
                break;
            case 850:
                canvasBlockImages_jpg[i].y = 0
                break;

            }

      
        cube.position.set(
        (canvasBlockImages_jpg[i].x/500 -1) * canvasBlockImages_jpg[i].offset, // x axis
        (canvasBlockImages_jpg[i].y/500 -1)* canvasBlockImages_jpg[i].offset, // y axis
        0.0001 // set on same z-axis
        )
        group.add(cube); // add to group
    })
}

scene.add(group)
// Render Loop
var render = function () {
    requestAnimationFrame( render );


    group.children.forEach(child=>{

        child.rotation.y += 0.01
        child.rotation.x += 0.01
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