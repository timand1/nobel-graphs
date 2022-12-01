import anime, { AnimeInstance } from "animejs";

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
      rotateZ: [0, 1080],
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

export { animationIn, animationOut };