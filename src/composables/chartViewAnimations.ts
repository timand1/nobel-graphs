import anime, { AnimeInstance } from "animejs";

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

export {
    slideAnim,
    slideBtnAnim,
    fadeInAnim,
    slideDownNavAnim,
    fadeInAnimContainer,
  };