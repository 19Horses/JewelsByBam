export function sketch(p5) {
  let pts = [];
  p5.setup = () => {
    p5.createCanvas(innerWidth, innerHeight);
    p5.noStroke();

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
      const sz = p5.map(d, 0, 400, 5, 2, true);
      const alpha = p5.map(d, 0, 400, 200, 150, true);
      p5.fill(250, 128, 114, alpha);
      p5.circle(x, y, sz);
    });
  };

  p5.windowResized = () => {
    pts = [];
    p5.createCanvas(innerWidth, innerHeight);
    p5.noStroke();

    for (let x = 0; x < p5.width - 0; x += 10) {
      for (let y = 0; y < p5.height - 0; y += 10) {
        pts.push({ x, y });
      }
    }
  };
}
