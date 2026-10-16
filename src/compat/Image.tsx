import type { ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  quality?: number;
};

export default function Image({ fill, priority: _priority, quality: _quality, style, ...props }: ImageProps) {
  return (
    <img
      {...props}
      style={{
        ...(fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : {}),
        ...style,
      }}
    />
  );
}
