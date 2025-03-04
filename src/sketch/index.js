export function sketch(p5) {
  let pts = [];
  p5.setup = () => {
    p5.createCanvas(innerWidth, innerHeight);
    p5.noStroke();

    for (let x = 0; x < p5.width - 0; x += 10) {
      for (let y = 0; y < p5.height - 0; y += 10) {
        pts.push({ x, y });
        // p5.circle(x, y, 1.25);
      }
    }
  };

  p5.draw = () => {
    p5.background(255);
    pts.forEach(({ x, y }) => {
      p5.fill("salmon");
      const d = p5.dist(p5.mouseX, p5.mouseY, x, y);
      const sz = p5.map(d, 0, 400, 3, 1.25);
      const csz = p5.constrain(sz, 1.25, 3);
      p5.circle(x, y, csz);
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
