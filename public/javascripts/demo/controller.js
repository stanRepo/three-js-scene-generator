import canvas from './canvas.js'
import threejs from './three.js'




function controller(){

let images = document.querySelectorAll('#demoImages > img')


let slicedImages = []

images.forEach(img=>{

    
    slicedImages.push(canvas(img))
    console.log(slicedImages)
    
  
    if(slicedImages.length === 6 ){
        console.log(slicedImages.length)
        threejs(slicedImages)
    }
    
    })
}
controller()
