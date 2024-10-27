import plugin from "tailwindcss/plugin";
import Color from "color";

export default function shadesFactory() {
  return plugin(({ addUtilities, theme }) => {
    const colors = theme("colors") as Record<
      string,
      string | Record<string, string>
    >;
    if (!colors) return;
    const utilities: Record<
      string,
      Record<string, string | Record<string, string>>
    > = {};
    for (const [colorName, shadesMap] of Object.entries(colors)) {
      // Skip single color values - colors without shades can't be inverted
      // automatically
      if (typeof shadesMap === "string") continue;
      for (const [tailwindUtilityName, cssProperties] of Object.entries(
        TailwindToCss,
      )) {
        for (const [shadeName, shadeValue] of Object.entries(shadesMap)) {
          utilities[
            `.${tailwindUtilityName}-contrast-${colorName}-${shadeName}`
          ] = {
            ...cssProperties(shadeValue),
            "@media (prefers-color-scheme: dark)": {
              ...cssProperties(invert(shadesMap, shadeValue)),
            },
          };
        }
      }
    }
    addUtilities(utilities);
  });
}

function invert(shadesMap: Record<string, string>, shadeValue: string) {
  const shades = Object.entries(shadesMap).sort(
    ([shadeNameA], [shadeNameB]) => Number(shadeNameB) - Number(shadeNameA),
  );
  const index = shades.findIndex(([, value]) => value === shadeValue);
  if (index === -1) {
    throw new Error(`Shade ${shadeValue} not found in shadesMap`);
  }
  return shades[shades.length - index - 1][1];
}

function rgb(value: string) {
  return new Color(value).rgb().array().join(" ");
}

// Maps tailwind property names to their corresponding CSS property names
const TailwindToCss: Record<string, (value: string) => Record<string, string>> =
  {
    bg: (value) => ({
      "--tw-bg-opacity": "1",
      "background-color": `rgba(${rgb(value)} / var(--tw-bg-opacity))`,
    }),
    border: (value) => ({
      "--tw-border-opacity": "1",
      "border-color": `rgba(${rgb(value)} / var(--tw-border-opacity))`,
    }),
    "border-t": (value) => ({
      "--tw-border-opacity": "1",
      "border-top-color": `rgba(${rgb(value)} / var(--tw-border-opacity))`,
    }),
    "border-r": (value) => ({
      "--tw-border-opacity": "1",
      "border-right-color": `rgba(${rgb(value)} / var(--tw-border-opacity))`,
    }),
    "border-b": (value) => ({
      "--tw-border-opacity": "1",
      "border-bottom-color": `rgba(${rgb(value)} / var(--tw-border-opacity))`,
    }),
    "border-l": (value) => ({
      "--tw-border-opacity": "1",
      "border-left-color": `rgba(${rgb(value)} / var(--tw-border-opacity))`,
    }),
    text: (value) => ({
      "--tw-text-opacity": "1",
      color: `rgba(${rgb(value)} / var(--tw-text-opacity))`,
    }),
    outline: (value) => ({ "outline-color": value }),
    decoration: (value) => ({ "text-decoration-color": value }),
    caret: (value) => ({ "caret-color": value }),
    fill: (value) => ({ fill: value }),
    stroke: (value) => ({ stroke: value }),
    shadow: (value) => ({
      "--tw-shadow": "var(--tw-shadow-colored)",
      "--tw-shadow-color": value,
    }),
    ring: (value) => ({
      "--tw-ring-opacity": "1",
      "--tw-ring-color": `rgba(${rgb(value)} / var(--tw-ring-opacity))`,
    }),
  };
