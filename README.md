ribcage-preview
===============

Run a preview server with live reloading for a ribcage component


## Install

```sh
npm install -g ribcage-preview
```

## Usage

```sh
ribcage-preview <dir>
```

`<dir>` should be the directory of the component you want to preview.

Create an `example` folder in your `<dir>` with an `entry.js` and an `entry.css` and optionally an `entry.html`.

`.jsx` files are also recognized. If the index file is `.jsx`, client-side JS will be off by default unless you pass a `s` or `--client-jsx` flag. The `index.jsx` file is always rendered by the server and the results appended to `<div id=app>`. Your `example/entry.jsx` should render into the same `div`.

```sh
open http://localhost:4001/default
```

This URL with livereload on every file change, and load in the compiled `entry.js` and `entry.css`.
