'use strict';

const stripWrapper = document.querySelector('.strip--wrapper');
const strip        = document.querySelector('.strip');
const leftBtn      = document.querySelector('.btn-left');
const rightBtn     = document.querySelector('.btn-right');
let moveValue      = 0;
   
leftBtn.addEventListener('click', function(){moveStrip('left')})
rightBtn.addEventListener('click', function(){moveStrip('right')})

function moveStrip(toggle) {

    let rightStop = strip.childElementCount * 200 - stripWrapper.getBoundingClientRect().width;
    let lastMove = stripWrapper.getBoundingClientRect().width % 200;
    
    if (toggle === 'left' && moveValue !== 0) {
        moveValue += 200;
        strip.style.transform = 'translateX(' + moveValue + 'px)';
    }
    else if(toggle === 'right') {
        moveValue -= 200;
        if (moveValue < -(rightStop - lastMove)) {
            strip.style.transform = 'translateX(' + -rightStop + 'px)';
            moveValue += 200;
            return   
        }
        strip.style.transform = 'translateX(' + moveValue + 'px)';
    }
}

// simulate object fit in IE

// checkIfIE();

// function checkIfIE() {

//     let ua   = window.navigator.userAgent;
//     let msie = ua.indexOf("MSIE ");

//     if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
//         simulateObFit();
//         window.addEventListener('resize', simulateObFit);
//     }
//     return false;
// }

// function simulateObFit() {
//     const strip      = document.querySelector('.strip');
//     const imgWrapper = document.querySelectorAll('.slide__img--wrapper');
//     const img        = strip.querySelectorAll('img');

//     for (let i = 0; i < img.length; i++) {

//         let wrapperWidth = imgWrapper[i].getBoundingClientRect().width;
//         let wrapperHeight = imgWrapper[i].getBoundingClientRect().height;
        
//         let imgWidth  = img[i].getBoundingClientRect().width;
//         let imgHeight = img[i].getBoundingClientRect().height;

//         // if ((imgWidth / imgHeight) < (wrapperWidth / wrapperHeight)) {

//             // img[i].style.width  = imgWrapper[i].getBoundingClientRect().width + 'px';
//             // img[i].style.height = 'auto';
//             // img[i].classList.add('category__img--vertical')
        
//         // } else {

//             img[i].style.height  = imgWrapper[i].getBoundingClientRect().height + 'px';
//             img[i].style.width = 'auto';
//             // img[i].classList.add('category__img--horizontal')

//         // }
//     }
// }