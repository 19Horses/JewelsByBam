import items from "../items.json";

export function sketch(p5, isError) {
  let pts = [];
  const images = [];
  let xOffset = 10;

  p5.preload = () => {
    if (isError) {
      items.forEach((item) => {
        images.push(p5.loadImage(item.fallback));
      });
    }
  };

  p5.setup = () => {
    p5.createCanvas(innerWidth, innerHeight);
    p5.noStroke();
    p5.imageMode(p5.CENTER);

    for (let x = 0; x < p5.width - 0; x += 10) {
      for (let y = 0; y < p5.height - 0; y += 10) {
        pts.push({ x, y });
      }
    }
  };

  p5.draw = () => {
    p5.background(255);
    pts.forEach(({ x, y }) => {
      const d = p5.dist(p5.mouseX, p5.mouseY, x, y);
      const sz = p5.map(d, 0, 400, 3, 1.25, true);
      const alpha = p5.map(d, 0, 400, 200, 150, true);
      p5.fill(250, 128, 114, alpha);
      p5.circle(x, y, sz);
    });

    if (isError) {
      [...images, ...images].forEach((img, i) => {
        const x = 200 + i * 400 - xOffset;
        const w = 450;
        const h = 400;
        p5.image(img, x, p5.height / 2, w, h);
      });
      xOffset += 1;
    }
  };

  p5.windowResized = () => {
    pts = [];
    p5.resizeCanvas(innerWidth, innerHeight);
    p5.noStroke();

    for (let x = 0; x < p5.width - 0; x += 10) {
      for (let y = 0; y < p5.height - 0; y += 10) {
        pts.push({ x, y });
      }
    }
  };
}
