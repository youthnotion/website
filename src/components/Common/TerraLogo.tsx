type TerraLogoProps = {
  size?: "badge" | "project";
  className?: string;
};

/** Project TERRA's sensor-and-terrain mark, kept inline so it works on every host. */
const TerraLogo = ({ size = "project", className = "" }: TerraLogoProps) => (
  <svg
    className={`terra-logo terra-logo-${size}${className ? ` ${className}` : ""}`}
    viewBox="0 0 64 64"
    role="img"
    aria-label="Project TERRA logo"
    focusable="false"
  >
    <path className="terra-logo-shell" d="M32 3 56 17v30L32 61 8 47V17L32 3Z" />
    <path className="terra-logo-contours" d="M18 21c5-5 11-5 15-1s8 5 13 1M16 28c6-5 12-5 17-1s9 5 15 1" />
    <path className="terra-logo-terrain" d="M15 39c5-5 11-5 17-1s11 4 17-1v9L32 56 15 46v-7Z" />
    <path className="terra-logo-wave" d="M16 39c5-4 11-4 16 0s11 4 17 0" />
    <circle className="terra-logo-sensor-halo" cx="32" cy="27" r="8" />
    <circle className="terra-logo-sensor" cx="32" cy="27" r="3" />
    <path className="terra-logo-signal" d="M32 15v5m-5-2a7 7 0 0 0-3 3m13-3a7 7 0 0 1 3 3" />
  </svg>
);

export default TerraLogo;
