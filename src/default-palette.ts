import colors from "tailwindcss/colors";
import { ShadesFactoryConfig, Theme } from "./types";

export function defaultForegroundShades(shades: Record<number, string>) {
  return {
    "0": [colors.white, shades[900]],
    "100": [shades[200], shades[800]],
    "200": [shades[300], shades[700]],
    "300": [shades[400], shades[600]],
    "400": [shades[400], shades[500]],
    "500": [shades[500], shades[400]],
    "600": [shades[600], shades[300]],
    "700": [shades[700], shades[200]],
    "800": [shades[800], shades[100]],
    "900": [shades[900], shades[50]],
  } satisfies Record<string, [string, string]>;
}

export function defaultBackgroundShades(shades: Record<number, string>) {
  return {
    "0": [colors.white, shades[900]],
    "50": [shades[50], shades[800]],
    "100": [shades[200], shades[700]],
    "200": [shades[300], shades[600]],
    "300": [shades[400], shades[500]],
    "400": [shades[400], shades[400]],
    "500": [shades[500], shades[300]],
    "600": [shades[600], shades[200]],
    "700": [shades[700], shades[100]],
    "800": [shades[800], shades[50]],
    "900": [shades[900], colors.white],
  } satisfies Record<string, [string, string]>;
}

export function defaultConfig(theme: Theme): ShadesFactoryConfig {
  return [
    {
      cssName: "color",
      tailwindName: "text",
      outputName: "contrast",
      colors: defaultForegroundShades(theme("colors.gray")),
    },
    {
      cssName: "background-color",
      tailwindName: "bg",
      outputName: "contrast",
      colors: defaultBackgroundShades(theme("colors.gray")),
    },
    {
      cssName: "border-color",
      tailwindName: "border",
      outputName: "contrast",
      colors: defaultBackgroundShades(theme("colors.gray")),
    },
    {
      cssName: "color",
      tailwindName: "text",
      outputName: "active-contrast",
      colors: defaultForegroundShades(theme("colors.blue")),
    },
    {
      cssName: "background-color",
      tailwindName: "bg",
      outputName: "active-contrast",
      colors: defaultBackgroundShades(theme("colors.blue")),
    },
    {
      cssName: "border-color",
      tailwindName: "border",
      outputName: "active-contrast",
      colors: defaultBackgroundShades(theme("colors.blue")),
    },
  ];
}
