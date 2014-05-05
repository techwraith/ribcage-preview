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

Create an `example` folder in your `<dir>` with an `entry.js` and an `entry.css`. All HTML should be created by `entry.js`.

```sh
open http://localhost:4000/default
```

This URL with livereload on every file change, and load in the compiled `entry.js` and `entry.css`.
