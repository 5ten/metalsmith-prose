# metalsmith-starter
A pre-selected group of metalsmith plugins that allow you to hit the ground running

## installation
`git clone git@github.com:pnochisaki/metalsmith-starter.git my-project-name && cd my-project-name`

`npm install`

`npm start`

## cool things
* pages and posts (yes, just like wordpress, but dead simple to create your own custom content types, see index.js)
* sass bourbon neat and bitters (totally optional, do whatever you want, see src/css/all.css)
* livereload
* handlebars
* partials
* pretty urls
* global config (see src/config.yaml)
* 404 page
* no gulp or grunt (all npm-based operations, not sure if this is cool or bummer, yet)

## bummers
you need to save a file in src or layouts after every npm start to cause livereload to see dynamic lists (navigation, posts, etc.) need to fix this!