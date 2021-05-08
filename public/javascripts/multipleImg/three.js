import setup from '../setup.js'

export default function(slicedImages){



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

for(let i=0;i<slicedImages[0].length;i++){


    
    const boxWidth = 0.1;
    const boxHeight = 0.1;
    const boxDepth = 0.1;
  
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const loader = new THREE.TextureLoader();
    const texture1 = loader.load(slicedImages[0][i].tile, (texture) => {
        // texture.rotation = 90;
        texture.needsUpdate = true
    })
  
    const texture2 = loader.load(slicedImages[1][i].tile, (texture) => {
     
        texture.needsUpdate = true
    })
  
    const texture3 = loader.load(slicedImages[2][i].tile, (texture) => {
      
        texture.needsUpdate = true
    })
  
    const texture4 = loader.load(slicedImages[3][i].tile, (texture) => {
    
        texture.needsUpdate = true
    })
  
    const texture5 = loader.load(slicedImages[4][i].tile, (texture) => {
       
        texture.needsUpdate = true
    })
  
    const texture6 = loader.load(slicedImages[5][i].tile, (texture) => {
    
        texture.needsUpdate = true
    })
  

        var material = [
            new THREE.MeshBasicMaterial({ // left
                map: texture1,
            }),
            new THREE.MeshBasicMaterial({ // right
                map: texture2,
            }),
            new THREE.MeshBasicMaterial({ // top
                map: texture3,
            }),
            new THREE.MeshBasicMaterial({ // bottom
                map: texture4,
            }),
            new THREE.MeshBasicMaterial({ // front
                map: texture5,
            }),
            new THREE.MeshBasicMaterial({ // back
                map: texture6,
            }),
        ];
       
        const cube = new THREE.Mesh(geometry, material);

 // rearrange the tiles so the image is correctly rendered
        const totalLengthPixels = slicedImages[0][i].tileCountY * setup.tileDimension
        slicedImages[0][i].y = (slicedImages[0][i].y - totalLengthPixels) * -1


      // set position
        cube.position.set(
        (slicedImages[0][i].x/500 -1) * setup.offsetX, // x axis
        (slicedImages[0][i].y/500 -1)* setup.offsetY, // y axis
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