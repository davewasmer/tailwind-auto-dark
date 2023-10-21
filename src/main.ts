import plugin from "tailwindcss/plugin";
import contrastProperty from "./utils/contrast-property";
import { defaultConfig } from "./default-palette";
import { RecursiveKeyValuePair, ShadesFactoryConfig, Theme } from "./types";

export default function shadesFactory(
  config: ShadesFactoryConfig | ((theme: Theme) => ShadesFactoryConfig),
) {
  return plugin(({ addUtilities, theme }) => {
    const resolvedConfig =
      typeof config === "function"
        ? config(theme)
        : config ?? defaultConfig(theme);
    resolvedConfig.forEach(({ cssName, tailwindName, outputName, colors }) => {
      const colorUtilities: RecursiveKeyValuePair<
        string,
        null | string | string[]
      > = {};
      Object.entries(colors).forEach(
        ([contrastShadeNumber, [lightMode, darkMode]]) => {
          colorUtilities[
            `.${tailwindName}-${outputName}-${contrastShadeNumber}`
          ] = contrastProperty(
            cssName,
            contrastShadeNumber,
            lightMode,
            darkMode,
          );
        },
      );
      addUtilities(colorUtilities);
    });
  });
}
