/** SVG `points` for a regular octagon with flat top and bottom edges. */
export const octagonPoints = (radius: number, cx = 250, cy = 250) =>
  Array.from({ length: 8 }, (_, i) => {
    const angle = (Math.PI / 4) * i + Math.PI / 8;
    return `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`;
  }).join(" ");
