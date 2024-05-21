import colors from "tailwindcss/colors";
import { ShadeMapping } from "./main";

export const foreground = {
  "0": [colors.white, 900],
  "100": [200, 800],
  "200": [300, 700],
  "300": [400, 600],
  "400": [400, 500],
  "500": [500, 400],
  "600": [600, 300],
  "700": [700, 200],
  "800": [800, 100],
  "900": [900, 50],
} as ShadeMapping;

export const background = {
  "0": [colors.white, 900],
  "50": [50, 800],
  "100": [200, 700],
  "200": [300, 600],
  "300": [400, 500],
  "400": [400, 400],
  "500": [500, 300],
  "600": [600, 200],
  "700": [700, 100],
  "800": [800, 50],
  "900": [900, colors.white],
} as ShadeMapping;
