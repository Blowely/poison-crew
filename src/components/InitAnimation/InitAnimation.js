import anime from 'animejs/lib/anime.es.js';

window.onload = () => {
  let loaderBoxWhite = document.getElementsByClassName("loader-box_white");
  let loaderBoxBlack = document.getElementsByClassName("loader-box_black");
  let loader__item_right = document.getElementsByClassName("loader__item_right");
  let loader__item_left = document.getElementsByClassName("loader__item_left");
  let loader = document.getElementsByClassName("loader");

  anime({
    targets: loaderBoxWhite,
    opacity: 1,
    scale: 3,
    translateX: [
      {value: 0, duration: 800, delay: 0, elasticity: 0},
      {value: -40, duration: 800, delay: 0, elasticity: 0}
    ],
    duration: 800,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loaderBoxBlack,
    opacity: [
      {value: 0, duration: 800, delay: 0, elasticity: 0},
      {value: 1, duration: 800, delay: 0, elasticity: 0}
    ],
    scale: 3,
    translateX: [
      {value: 0, duration: 800, delay: 0, elasticity: 0},
      {value: 60, duration: 800, delay: 0, elasticity: 0}
    ],
    backgroundColor: '#000',
    duration: 800,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loader__item_right,
    translateX: 50,
    duration: 800,
    delay: 800,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loader__item_left,
    duration: 800,
    delay: 800,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loader,
    translateY: -1200,
    position: 'center',
    duration: 800,
    delay: 220000000,
    easing: 'easeInOutExpo'
  })


  /*etTimeout(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, 1000);*/
}