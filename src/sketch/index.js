export function sketch(p5) {
  const pts = [];
  p5.setup = () => {
    p5.createCanvas(innerWidth, innerHeight);
    p5.noStroke();

    for (let x = 0; x < p5.width - 0; x += 10) {
      for (let y = 0; y < p5.height - 0; y += 10) {
        pts.push({ x, y });
        p5.fill("salmon");
        p5.circle(x, y, 1.25);
      }
    }
  };

  p5.windowResized = () => {
    p5.createCanvas(innerWidth, innerHeight);
    p5.noStroke();

    for (let x = 0; x < p5.width - 0; x += 10) {
      for (let y = 0; y < p5.height - 0; y += 10) {
        pts.push({ x, y });
        p5.fill("salmon");
        p5.circle(x, y, 1.25);
      }
    }
  };
}
