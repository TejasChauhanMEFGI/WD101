let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
  let img = new Image();
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return "https://tejaschauhanmefgi.github.io/WD101/images/martial-arts/" + animation + "/" + frameNumber + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let loadImages = (callback) => {
  let images = { idle: [], kick: [], punch: [], block: [] };
  let imagesToload = 0;

  ["idle", "kick", "punch", "block"].forEach((animation) => {
    let animationFrames = frames[animation];
    imagesToload += animationFrames.length;

    animationFrames.forEach((frameNumber) => {
      let path = imagePath(frameNumber, animation);
      loadImage(path, (image) => {
        images[animation][frameNumber - 1] = image;
        imagesToload--;
        if (imagesToload === 0) callback(images);
      });
    });
  });
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queueAnimation = [];

  let aux = () => {
    let selectedAnimation;
    if (queueAnimation.length === 0) selectedAnimation = "idle";
    else selectedAnimation = queueAnimation.shift();

    animate(ctx, images, selectedAnimation, aux);
  };
  aux();

  document.getElementById("kick").onclick = () => {
    queueAnimation.push("kick");
  };
  document.getElementById("punch").onclick = () => {
    queueAnimation.push("punch");
  };
  document.getElementById("block").onclick = () => {
    queueAnimation.push("block");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft"

    if (key === "ArrowRight") queueAnimation.push("punch");
    if (key === "ArrowLeft") queueAnimation.push("kick");
    if (key === "ArrowDown") queueAnimation.push("block");
  });
});
