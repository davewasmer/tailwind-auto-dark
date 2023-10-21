import colorWithOpacity from "./color-with-opacity";

export default function contrastProperty(
  property: string,
  twOpacityName: string,
  light: string,
  dark: string,
) {
  return {
    [property]: colorWithOpacity(light, twOpacityName),
    "@media (prefers-color-scheme: dark)": {
      [property]: colorWithOpacity(dark, twOpacityName),
    },
  };
}
