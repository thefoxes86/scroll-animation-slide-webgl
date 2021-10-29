import * as app from './app.js';

export function loop() {
    var time = Date.now() / 3000;
    var newTime;
    newTime = time;

    return newTime;
}



export var speed = 0;
export var position = 0;
export var block = document.getElementById('block');
export var wrap = document.getElementById('wrap');
export var rounded = 0;
export var elem = document.querySelectorAll('.n');
export var obj = Array(5).fill({dist:0});
export var navs = document.querySelectorAll('li');
export var nav = document.querySelector('.nav');
export var attractMode = false;
export var attractEl = 0;
export var meshes = [];
export var groups = [];
export var img = document.querySelectorAll('img');
export var numImg = img.length;
export var back = document.querySelectorAll('.back');

window.addEventListener('wheel', (e)=>{
    speed += e.deltaY* 0.0003;
});



// function when scroll mouse
export function raf () {

    position += speed;
    speed *= 0.8;
    rounded = Math.round(position);

    // controllo slide immagini
    obj.forEach((o,i)=>{
        o.dist = Math.min(Math.abs((position - i)),1);
        o.dist = 1 - o.dist**2;
        let numSlide = Math.abs(Math.round(position))
        elem[i].style.transform = 'scale('+ (1 +0.4* o.dist) +')';
        elem[i].style.opacity = o.dist;
        back[i].style.opacity = o.dist;

        let scale = 1 + 0.1 * o.dist;
        if (Number(numSlide) < Number(numImg)) {
            meshes[i].position.y = i * 3.5 - position * 3.5;
            meshes[i].scale.set(scale,scale,scale);
            meshes[i].material.opacity = (1 * o.dist);
        }
        
    })

    let diff = rounded - position;


    if (attractMode) {
        position -= (position - attractEl) * 0.02;
    } else {

        position += Math.sign(diff)*Math.pow(Math.abs(diff),0.7)*0.015;
    }

    wrap.style.transform = 'translate(0,'+ (- position*100 +50) +'px)';
    window.requestAnimationFrame(raf);
}

setTimeout(() => {
    
    let rots = groups.map(e=>e.rotation);
    nav.addEventListener('mouseenter', function(){
        attractMode = true;
        gsap.to(rots,{
            duration: 0.3,
            y: 0,
            x: -0.1,
            z: 0
        })
    })
    
    nav.addEventListener('mouseleave', function(){
        attractMode = false;
        gsap.to(rots,{
            duration: 0.3,
            y: -0.5,
            x: -0.2,
            z: -0.1
        })
    })
    
    navs.forEach( (el)=>{
        el.addEventListener('mouseover', (e)=>{
            attractEl = el.getAttribute('data-nav');
            
        });
    });
}, 2000);