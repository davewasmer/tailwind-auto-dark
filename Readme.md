# tailwind-contrast-colors

This package makes it easy to create a set of Tailwind utilities that will apply both light and dark mode colors to a particular property with a single class.

For example, rather than:

```tsx
<div className="text-gray-600 dark:text-gray-400">
```

You can just use:

```tsx
<div className="text-contrast-600">
```

This is particularly useful if you are relatively consistent with light/dark mode color schemes, and they tend to be the inverse of each other.

## Installation

```sh
$ npm install -D tailwind-contrast-colors
$ pnpm add -D tailwind-contrast-colors
```

In your `tailwind.config.js` file, add the plugin:

```js
const config = {
  // ...
  plugins: [
    // Use the default palette
    require('tailwind-contrast-colors'),
```

## Default palette

The plugin ships with a default palette, which will generate the following:

- Gray contrast colors, which use your theme's `gray` color

  - `text-contrast-[0 -> 900]`
  - `bg-contrast-[0 -> 900]`
  - `border-contrast-[0 -> 900]`

- "Active" contrast colors, which use your theme's `blue` color
  - `text-active-contrast-[0 -> 900]`
  - `bg-active-contrast-[0 -> 900]`
  - `border-active-contrast-[0 -> 900]`

This means that out of the box, you can use:

```tsx
<div className="text-contrast-600"/>
<div className="bg-active-contrast-600"/>
<div className="border-contrast-600"/>
```

## Customizing

You can customize the generated contrasting colors:

```js
    // Or, supply your own as an array of config objects
    require('tailwind-contrast-colors')((theme) => [
      // This will generate `text-foo-weak`
      {
        cssName: "color",
        tailwindName: "text",
        outputName: "foo",
        colors: {
          "weak": [theme.colors.gray[50], theme.colors.gray[900]],
        }
      },
    ]),
```
