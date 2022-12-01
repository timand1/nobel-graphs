import anime, { AnimeInstance } from "animejs";

// Chart animations

let animation: AnimeInstance | null = null;
const animChart: (target: string) => AnimeInstance = (target) => {
  animation = anime({
    targets: target,
    duration: 1000,
    scale: [1, 1],
    opacity: [0, 1],
    easing: "linear",
    delay: 1000,
  });
  return animation;
};
const animationIn: (
  target: string,
  type: string
) => AnimeInstance | null | undefined = (target, type) => {
  if (type == "fade") {
    const anim = animChart(target);
    return anim;
  } else if (type == "grow") {
    animation = anime({
      targets: target,
      duration: 1000,
      opacity: [0, 1],
      scale: [0, 1],
      easing: "linear",
      delay: 1000,
    });
  } else if (type == "spin") {
    animation = anime({
      targets: target,
      duration: 1000,
      opacity: [0, 1],
      scale: [0, 1],
      rotateZ: 1080,
      easing: "easeOutBack",
      delay: 1000,
    });
  } else if (type == "bounce") {
    animation = anime({
      targets: target,
      duration: 1000,
      opacity: [0, 1],
      scale: [0, 1],
      keyframes: [
        { translateY: 200 },
        { translateY: 0 },
        { translateY: 200 },
        { translateY: 0 },
        { translateY: 200 },
        { translateY: 0 },
      ],
      easing: "easeOutBack",
      delay: 1000,
    });
  } else if (type == "slide") {
    animation = anime({
      targets: target,
      duration: 1000,
      opacity: [0, 1],
      scale: [0, 1],
      keyframes: [{ translateX: "40vw" }, { translateX: 0 }],
      easing: "linear",
      delay: 0,
    });
  } else {
    return;
  }
  return animation;
};

const animationOut: (
  target: string,
  type: string
) => AnimeInstance | null | undefined = (target, type) => {
  if (type == "fade") {
    animation = anime({
      targets: target,
      duration: 1000,
      opacity: [1, 0],
      easing: "linear",
      delay: 0,
    });
  } else if (type == "grow") {
    animation = anime({
      targets: target,
      duration: 1000,
      opacity: [1, 0],
      scale: [1, 0],
      easing: "linear",
      delay: 0,
    });
  } else if (type == "spin") {
    animation = anime({
      targets: target,
      duration: 1000,
      opacity: [1, 0],
      scale: [1, 0],
      rotateZ: [1080, 0],
      easing: "easeInBack",
      delay: 0,
    });
  } else if (type == "bounce") {
    animation = anime({
      targets: target,
      duration: 1000,
      opacity: [1, 0],
      scale: [1, 0],
      keyframes: [
        { translateY: 200 },
        { translateY: 0 },
        { translateY: 200 },
        { translateY: 0 },
        { translateY: 200 },
        { translateY: 0 },
      ],
      easing: "easeInBack",
      delay: 0,
    });
    return animation;
  } else if (type == "slide") {
    animation = anime({
      targets: target,
      duration: 1000,
      opacity: [1, 0],
      scale: [1, 0],
      keyframes: [{ translateX: "-40vw" }, { translateX: 0 }],
      easing: "linear",
      delay: 0,
    });
  } else {
    return;
  }
  return animation;
};

// Chart view animations

let slideBtn: AnimeInstance | null = null;
let fadeInContainer: AnimeInstance | null = null;
let slide: AnimeInstance | null = null;
let slideDownNav: AnimeInstance | null = null;
let fadeIn: AnimeInstance | null = null;

const slideAnim: () => void = () => {
  slide = anime({
    duration: 1000,
    targets: ".charts",
    translateX: ["100vw", 0],
    easing: "linear",
  });
};
const slideBtnAnim: () => void = () => {
  slideBtn = anime({
    duration: 2000,
    targets: ".links .navBtn",
    keyframes: [{ translateY: [-200, 0] }, { translateY: [250, 0] }],
    delay: anime.stagger(150, { start: 1500 }),
    easing: "linear",
  });
};

const fadeInAnim: () => void = () => {
  fadeIn = anime({
    targets: ".animations",
    opacity: [0, 1],
    duration: 1000,
    easing: "linear",
    delay: 2000,
  });
};

const fadeInAnimContainer: () => void = () => {
  fadeInContainer = anime({
    targets: ".gender-container",
    opacity: [0, 1],
    translateX: [-200, 0],
    translateY: [200, 0],
    duration: 1000,
    easing: "linear",
    delay: 2000,
  });
};

const slideDownNavAnim: () => void = () => {
  slideDownNav = anime({
    targets: ".links",
    opacity: [0, 1],
    translateY: [-200, 0],
    duration: 1000,
    easing: "linear",
    delay: 1000,
  });
};

// Landingpage

let logoAnim: AnimeInstance | null = null;
let textAmim: AnimeInstance | null = null;
let header: AnimeInstance | null = null;
let subHeader: AnimeInstance | null = null;
let btnFadeIn: AnimeInstance | null = null;
let goToChart: AnimeInstance | null = null;

const landingAnim: () => void = () => {
  logoAnim = anime({
      targets: '.hero img',
      keyframes: [
          {width: 0},
          {width: '15vw'},
          {left: 0}
      ],
      duration: 3000
  })
  textAmim = anime({
      targets: '.hero .text-content',
      opacity: [0, 1],
      duration: 3000,
      delay: 3000,
      easing: 'linear'
  })

  header = anime({
      targets: '.hero .text-content h1',
      opacity: [0, 1],
      duration: 500,
      delay: 3000,
      easing: 'linear'
  })

  subHeader = anime({
      targets: '.hero .text-content svg path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 500,
      delay: function(el, i) { return i * 150 },
  })

  btnFadeIn = anime({
      targets: '.hero button',
      opacity: [0, 1],
      duration: 1000,
      delay: 5500,
      easing: 'linear'
  })
}  

export {
  animationIn,
  animationOut,
  slideAnim,
  slideBtnAnim,
  fadeInAnim,
  slideDownNavAnim,
  fadeInAnimContainer,
  landingAnim
};
