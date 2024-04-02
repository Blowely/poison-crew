import anime from "animejs";
export const startLoaderAnimation = () => {
  let loader = document.getElementsByClassName("loader");

  let loaderBoxWrapper = document.getElementsByClassName("loader-box-wrapper");
  let loaderBoxWhite = document.getElementsByClassName("loader-box_white");
  let loaderBoxBlack = document.getElementsByClassName("loader-box_black");
  let loader__item_right = document.getElementsByClassName("loader__item_right");
  let loader__item_left = document.getElementsByClassName("loader__item_left");
  let loader__item_left_partition = document.getElementsByClassName("loader__item_left_partition");

  let mainLogoLine = document.getElementsByClassName("main-logo-line");
  let mainLogoLineLeft = document.getElementsByClassName("main-logo-line-left");
  let mainLogoLineRight = document.getElementsByClassName("main-logo-line-right");

  const isDesktopScreen = window.screen.availWidth > 600;

  anime({
    targets: loaderBoxWhite,
    opacity: 1,
    translateX: [
      {value: 0, duration: 800, delay: 0, elasticity: 0},
      {value: isDesktopScreen ? -130 : -109, duration: 800, delay: 0, elasticity: 0},
    ],
    scale: isDesktopScreen ? 3 : 1.6,
    duration: 800,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loaderBoxBlack,
    opacity: [
      {value: 0, duration: 1000, delay: 0, elasticity: 0},
      {value: 1, duration: 0, delay: 1000, elasticity: 0}
    ],
    scale: isDesktopScreen ? 3 : 1.6,
    translateX: [
      {value: 0, duration: 800, delay: 0, elasticity: 0},
      {value: isDesktopScreen ? 85 : 134, duration: 800, delay: 0, elasticity: 0},
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
    transition: "all 800ms cubic-bezier(0.245, 1.060, 0.590, 0.885)",
    transitionTimingFunction: "cubic-bezier(0.245, 1.060, 0.590, 0.885)"
  })
  anime({
    targets: loader__item_left,
    duration: 800,
    delay: 800,
    easing: 'easeInOutExpo'
  })
  anime({
    targets: loader__item_left_partition,
    marginBottom: [
      {value: "120px", duration: 1200, delay: 1200, velocity: 200}
    ],
    duration: 800,
    delay: 1000,
    transition: "all 800ms cubic-bezier(0.385, 1.015, 0.705, 0.780)",
    transitionTimingFunction: "cubic-bezier(0.385, 1.015, 0.705, 0.780)"
  })

  const calcTranslateY = isDesktopScreen ? ((loader[0]?.clientHeight / 2 - 57) * -1) : ((loader[0]?.clientHeight / 2 - 46) * -1)

  anime({
    targets: loaderBoxWrapper,
    translateY: [
      {value: calcTranslateY, duration: 800, delay: 1800}
    ],
    scale: isDesktopScreen ? 0.4: 0.52,
    duration: 800,
    delay: 1800,
    transition: "all 400ms cubic-bezier(0.080, 0.600, 0.730, 0.960)",
    transitionTimingFunction: "cubic-bezier(0.420, 0.650, 0.730, 0.960)"
  })

  anime({
    targets: mainLogoLineLeft,
    translateX: [
      {value: "-110%", duration: 0, delay: 0},
      {value: 0, duration: 1100, delay: 1800}
    ],
    zIndex: 6,
    transition: "all 1100ms cubic-bezier(0.310, 0.645, 0.730, 0.960)",
    transitionTimingFunction: "cubic-bezier(0.310, 0.645, 0.730, 0.960)"
  })

  anime({
    targets: mainLogoLineRight,
    translateX: [
      {value: "110%", duration: 0, delay: 0},
      {value: 0, duration: 1100, delay: 1800}
    ],
    zIndex: 6,
    transition: "all 1100ms cubic-bezier(0.310, 0.645, 0.730, 0.960)",
    transitionTimingFunction: "cubic-bezier(0.310, 0.645, 0.730, 0.960)"
  })

  anime({
    targets: mainLogoLine,
    borderColor: [
      {value: "rgb(0,0,0)", duration: 400, delay: 3000}
    ],
    easing: "easeInOutExpo",
  })

  anime({
    targets: loader,
    visibility: "hidden",
    opacity: 0,
    transition: "visibility 0s 0.4s, opacity 0.4s linear",
    position: 'center',
    duration: 400,
    delay: 3000,
    easing: 'easeInOutExpo',
    complete: function(anim) {
      loader[0]?.remove();
    }
  })
}
