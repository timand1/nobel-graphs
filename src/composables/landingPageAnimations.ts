import anime, { AnimeInstance } from "animejs";

let logoAnim: AnimeInstance | null = null;
let textAmim: AnimeInstance | null = null;
let header: AnimeInstance | null = null;
let subHeader: AnimeInstance | null = null;
let btnFadeIn: AnimeInstance | null = null;

const BASE_DURATION = 500;

const landingAnim: () => void = () => {
  logoAnim = anime({
      targets: '.hero img',
      keyframes: [
          {width: 0},
          {width: '15vw'},
          {left: 0}
      ],
      duration: BASE_DURATION * 6
  })
  textAmim = anime({
      targets: '.hero .text-content',
      opacity: [0, 1],
      duration: BASE_DURATION * 6,
      delay: BASE_DURATION * 6,
      easing: 'linear'
  })

  header = anime({
      targets: '.hero .text-content h1',
      opacity: [0, 1],
      duration: BASE_DURATION,
      delay: BASE_DURATION * 6,
      easing: 'linear'
  })

  subHeader = anime({
      targets: '.hero .text-content svg path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: BASE_DURATION,
      delay: function(el, i) { return i * 150 },
  })

  btnFadeIn = anime({
      targets: '.hero button',
      opacity: [0, 1],
      duration: BASE_DURATION * 2,
      delay: BASE_DURATION * 11,
      easing: 'linear'
  })
}  

export { landingAnim };
