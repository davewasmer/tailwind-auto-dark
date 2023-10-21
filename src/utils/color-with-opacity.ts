import Color from "color";

export default function colorWithOpacity(hex: string, opacityVar: string) {
  return `rgba(${new Color(hex)
    .rgb()
    .array()
    .join(" ")} / var(--tw-${opacityVar}-opacity))`;
}
