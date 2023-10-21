import { type Config } from "tailwindcss";

export type ShadesFactoryConfig = Array<{
  /**
   * The name of the CSS property to apply the color values to, i.e.
   * "background-color"
   */
  cssName: string;
  /**
   * The name used by Tailwind for this property, i.e. "bg"
   */
  tailwindName: string;
  /**
   * The name to use in output classes, i.e. "contrast" produces classes like
   * "bg-contrast-400"
   */
  outputName: string;
  /**
   * A set of tuples with light and dark color values for each contrast shade.
   * I.e. { "50": [ lightModeColor, darkModeColor ], "100": ... }.
   *
   * The higher the number, the more contrast.
   */
  colors: Record<number, [light: string, dark: string]>;
}>;

// Yanked from Tailwind since it doesn't export them

export interface RecursiveKeyValuePair<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  K extends keyof any = string,
  V = string,
> {
  [key: string]: V | RecursiveKeyValuePair<K, V>;
}
export type Theme = <TDefaultValue = Config["theme"]>(
  path?: string,
  defaultValue?: TDefaultValue,
) => TDefaultValue;
