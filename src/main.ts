import plugin from "tailwindcss/plugin";
import Color from "color";
import { type Config } from "tailwindcss";
import { background, foreground } from "./default-palette";

export type ShadeConfig = {
  /** The name of the color in your theme to use as the reference color for any relative shades in your shade mapping */
  themeColor: string;
  /** Optionally override the utility class names generated, i.e. outputName: "foo" -> .text-foo-300. If not supplied, defaults to `${themeColor}-contrast` */
  outputName?: string;
  /** Which Tailwind properties should these be generated for? */
  properties: SupportedProperty[];
  /** Mapping of shade level to light and dark values */
  shadeMapping: ShadeMapping;
};

export type ShadeMapping = Record<string, [string | number, string | number]>;
export type ResolvedShadeMapping = Record<string, [string, string]>;

export type Theme = <TDefaultValue = Config["theme"]>(
  path?: string,
  defaultValue?: TDefaultValue,
) => TDefaultValue;

export default function shadesFactory(configs: ShadeConfig[]) {
  if (!configs.some((c) => c.themeColor === "gray")) {
    configs.push({
      themeColor: "gray",
      outputName: "contrast",
      properties: ["bg", "border", "ring"],
      shadeMapping: background,
    });
    configs.push({
      themeColor: "gray",
      outputName: "contrast",
      properties: ["text"],
      shadeMapping: foreground,
    });
  }

  return plugin(({ addUtilities, theme }) => {
    configs.forEach(({ themeColor, outputName, properties, shadeMapping }) => {
      const resolvedShadeMapping = resolveShadeMapping(
        theme,
        themeColor,
        shadeMapping,
      );
      properties.forEach((property) => {
        addUtilities(
          shadeUtilitiesForProperty(
            property,
            outputName,
            themeColor,
            resolvedShadeMapping,
          ),
        );
      });
    });
  });
}

// Takes a tailwind property (i.e. "bg"), a base theme color name (i.e. "blue"),
// and a mapping of each standard shade number to a light and dark color value.
// Returns an object that can be passed into addUtilities.
function shadeUtilitiesForProperty(
  tailwindProperty: SupportedProperty,
  outputName: string | undefined,
  themeColor: string,
  resolvedShadeMapping: ResolvedShadeMapping,
) {
  return Object.entries(resolvedShadeMapping).reduce(
    (utilities, [shade, [lightColor, darkColor]]) => {
      const exportedClassName = `.${tailwindProperty}-${
        outputName ?? themeColor + "-contrast"
      }-${shade}`;
      utilities[exportedClassName] = generateUtilityClass(
        tailwindProperty,
        lightColor,
        darkColor,
      );
      return utilities;
    },
    {} as Record<string, Record<string, string | Record<string, string>>>,
  );
}

// Maps tailwind property names to their corresponding CSS property names
const tailwindToCssProperty = {
  bg: "background-color",
  border: "border-color",
  text: "color",
  ring: "color",
  decoration: "text-decoration-color",
  caret: "caret-color",
  "border-t": "border-top-color",
  "border-r": "border-right-color",
  "border-b": "border-bottom-color",
  "border-l": "border-left-color",
  outline: "outline-color",
  fill: "fill",
  stroke: "stroke",
};

export type SupportedProperty = keyof typeof tailwindToCssProperty;

const tailwindPropertyToOpacityVariable: { [P in SupportedProperty]?: string } =
  {
    bg: "bg",
    border: "border",
    text: "text",
  };

// Takes a tailwind property (i.e. "bg"), a light color value, and a dark color,
// and returns the body of the CSS definition for the contrast-aware utility class.
function generateUtilityClass(
  tailwindProperty: SupportedProperty,
  lightColor: string,
  darkColor: string,
): Record<string, string | Record<string, string>> {
  const cssProperty = tailwindToCssProperty[tailwindProperty];
  const tailwindOpacityVariable =
    tailwindPropertyToOpacityVariable[tailwindProperty];
  return {
    [cssProperty]: colorValue(lightColor, tailwindOpacityVariable),
    "@media (prefers-color-scheme: dark)": {
      [cssProperty]: colorValue(darkColor, tailwindOpacityVariable),
    },
  };
}

// Print the color value as rgb, including an optional opacity variable
function colorValue(hex: string, opacityVariable?: string) {
  const rgb = new Color(hex).rgb().array().join(" ");
  if (opacityVariable) {
    return `rgba(${rgb} / var(--tw-${opacityVariable}-opacity))`;
  }
  return `rgb(${rgb})`;
}

// Shade mappings (i.e. the light and dark colors to use for each shade level)
// can be specified as numbers (indicating the shade of the base color to use)
// or as a string (indicating a direct color value to use). This method converts
// any of those shade number references to their underlying actual color values
// (i.e. 900 -> "#333333")
function resolveShadeMapping(
  theme: Theme,
  themeColor: string,
  shadeMapping: ShadeConfig["shadeMapping"],
) {
  const resolvedShadeMapping: ResolvedShadeMapping = {};
  Object.entries(shadeMapping).forEach(([shade, [light, dark]]) => {
    resolvedShadeMapping[shade] = [
      typeof light === "number"
        ? theme(`colors.${themeColor}.${light}`)
        : light,
      typeof dark === "number" ? theme(`colors.${themeColor}.${dark}`) : dark,
    ];
  });
  return resolvedShadeMapping;
}
