import anime from 'animejs/lib/anime.es.js';

window.onload = () => {
  let loaderBoxWhite = document.getElementsByClassName("loader-box_white");
  let loaderBoxBlack = document.getElementsByClassName("loader-box_black");
  let loader__item_right = document.getElementsByClassName("loader__item_right");
  let loader = document.getElementsByClassName("loader");
  let headerWrapper = document.getElementsByClassName("header-wrapper-wrapper");
  let title = document.getElementsByClassName("title-img-block-abs-pos__item");
  let img = document.getElementsByClassName("img-me");
  anime({
    targets: loaderBoxWhite,
    opacity: 1,
    scale: 2,
    translateX: [
      {value: 0, duration: 1000, delay: 0, elasticity: 0},
      {value: -150, duration: 1000, delay: 0, elasticity: 0}
    ],
    backgroundColor: '#FFF',
    duration: 1000,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loaderBoxBlack,
    opacity: [
      {value: 0, duration: 1000, delay: 0, elasticity: 0},
      {value: 1, duration: 1000, delay: 0, elasticity: 0}
    ],
    scale: 2,
    translateX: [
      {value: 0, duration: 1000, delay: 0, elasticity: 0},
      {value: 150, duration: 1000, delay: 0, elasticity: 0}
    ],
    backgroundColor: '#000',
    duration: 1000,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loader__item_right,
    translateY: -95,
    duration: 1700,
    delay: 500,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loader,
    translateY: -1200,
    position: 'center',
    duration: 1000,
    delay: 2200,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: headerWrapper,
    translateY: 80,
    duration: 1000,
    delay: 2400,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: headerWrapper,
    opacity: 1,
    duration: 1000,
    delay: 0,
    easing: 'easeInOutExpo'
  })

  anime({
    targets: title,
    translateX: [
      {value: 0, duration: 1000, delay: 800, elasticity: 0},
      {value: '45%', duration: 1000, delay: 800, elasticity: 0}
    ],
    duration: 1000,
    delay: 2000,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: img,
    translateX: [
      {value: 0, duration: 1000, delay: 800, elasticity: 0},
      {value: '-130%', duration: 1000, delay: 800, elasticity: 0}
    ],
    duration: 1000,
    delay: 2000,
    easing: 'easeInOutExpo'
  })

  setTimeout(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, 1000);
}

