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

Create an `example` folder in your `<dir>` with an `entry.js` and an `entry.css` and optionally an `entry.html` and `data.js` files.

`.jsx` files are also recognized. If the index file is `.jsx`, client-side JS will be off by default unless you pass a `s` or `--client-jsx` flag. The `index.jsx` file is always rendered by the server and the results appended to `<div id=app>`. Your `example/entry.jsx` should render into the same `div`.

### Flags
#### `no-debug`
You can disable sourcemaps with `--no-debug`

#### `client-jsx` or `s`
If the entry file is `.jsx`, client-side js will not be served unless this flag is passed.

### `react-router` or `r`
If passed, the index file should pass a routes object for react-router instead of a component. This turns on `spaMode` so that both the server and the client render the same routes.



```sh
open http://localhost:4001/default
```

This URL with livereload on every file change, and load in the compiled `entry.js` and `entry.css`.

### Providing data to server-side jsx
If you have an `example/entry.jsx` file, it's rendered on the client for you. If you want to provide data to this client on the server, put in a `example/data.json` or `example/data.js`. This object will get passed as props to the react component by the server. You're responsible for passing this object to your component on the client.
