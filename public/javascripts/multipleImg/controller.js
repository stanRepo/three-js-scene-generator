import canvas from './canvas.js'
import threejs from './three.js'

function controller(){

let slicedImages = []

let inputElements = document.querySelectorAll('input[type=file]')
console.log(inputElements.length)

inputElements.forEach(el=>{
    el.addEventListener('change', ()=>{
        slicedImages.push(canvas(el))
        console.log(slicedImages)


        console.log(canvas(el))
        if(slicedImages.length === 7 ){
            console.log(slicedImages.length)
            threejs(slicedImages)
        }
        })   
    })
}
controller()
