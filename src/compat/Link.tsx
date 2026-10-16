import type { AnchorHTMLAttributes } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  scroll?: boolean;
  prefetch?: boolean;
};

export default function Link({ scroll: _scroll, prefetch: _prefetch, ...props }: LinkProps) {
  return <a {...props} />;
}
