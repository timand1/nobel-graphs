import anime, { AnimeInstance } from "animejs";

let logoAnim: AnimeInstance | null = null;
let textAmim: AnimeInstance | null = null;
let header: AnimeInstance | null = null;
let subHeader: AnimeInstance | null = null;
let btnFadeIn: AnimeInstance | null = null;

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

export { landingAnim };
