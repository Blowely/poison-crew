import anime from 'animejs/lib/anime.es.js';

window.onload = () => {
  let loaderBoxWhite = document.getElementsByClassName("loader-box_white");
  let loaderBoxWhiteWrapper = document.getElementsByClassName("loader-box_white_wrapper");
  let loaderBoxBlack = document.getElementsByClassName("loader-box_black");
  let loader__item_right = document.getElementsByClassName("loader__item_right");
  let loader__item_left = document.getElementsByClassName("loader__item_left");
  let loader__item_left_partition = document.getElementsByClassName("loader__item_left_partition");
  let loader = document.getElementsByClassName("loader");


  anime({
    targets: loaderBoxWhiteWrapper,
    opacity: 1,
    scale: 3,
    translateX: [
      {value: 0, duration: 800, delay: 0, elasticity: 0},
      {value: -30, duration: 800, delay: 0, elasticity: 0}
    ],
    duration: 800,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loaderBoxWhite,
    opacity: 1,
    scale: 3,
    duration: 800,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loaderBoxBlack,
    opacity: [
      {value: 0, duration: 800, delay: 0, elasticity: 0},
      {value: 1, duration: 0, delay: 800, elasticity: 0}
    ],
    scale: 3,
    translateX: [
      {value: 0, duration: 800, delay: 0, elasticity: 0},
      {value: 100, duration: 800, delay: 0, elasticity: 0}
    ],
    backgroundColor: '#000',
    duration: 800,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loader__item_right,
    translateX: 50,
    duration: 800,
    delay: 1000,
    transition: "all 800ms cubic-bezier(0.200, 1.035, 0.395, 0.900)",
    transitionTimingFunction: "cubic-bezier(0.200, 1.035, 0.395, 0.900)"
    //easing: 'cubicBezier(.5, .05, .1, .3)'
  })
  anime({
    targets: loader__item_left,
    /*boxShadow: [
      {value: "0px 166px 0px 0px rgba(252,47,47,1) inset", duration: 1200, delay: 0, elasticity: 0},
      {value: "0px 0px 0px 0px rgba(252,47,47,1) inset", duration: 1200, delay: 160000000, elasticity: 0}
    ],*/
    duration: 800,
    delay: 800,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loader__item_left_partition,
    marginBottom: [
      {value: "120px", duration: 1200, delay: 800, velocity: 200}
    ],
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