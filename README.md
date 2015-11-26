# metalsmith-starter
A pre-selected group of metalsmith plugins and a content scaffolding that allow you to hit the ground running with your static site built in metalsmith. see <a href="http://metalsmith.io">metalsmith.io</a> for more details.

## installation
`git clone git@github.com:pnochisaki/metalsmith-starter.git my-project-name && cd my-project-name`

`npm install`

`npm start`

## cool things
* pages and posts (yes, just like wordpress, but dead simple to create your own custom content types, see index.js)
* yaml front matter for all the fields you can eat!
* sass bourbon neat and bitters (totally optional, do whatever you want, see src/css/all.scss)
* livereload
* handlebars
* partials
* pretty urls
* global config (see src/config.yaml)
* 404 page
* no gulp or grunt (all npm-based operations, not sure if this is cool or bummer, yet)
* deploy using rsync (see package.json)

## bummers
you need to save a file in src or layouts after every npm start to cause livereload to see dynamic lists (navigation, posts, etc.) need to fix this!

## thoughts
As you may or mat not know, Metalsmith, at it's core, does very little.  It simply iterates through your source content and scrapes metadata into a useful form, *does things*, and then copies all the files to the build directory. (seems to do so using primarily bash) There are only a handful of metalsmith starters out there, and they all seem steeped in various flavors of gulp, grunt, bash scripts, various other node projects, and things like bootstrap. This was all too much for me. I followed (what i would say is) the "metalsmith" way of doing things, by relying ONLY on the metalsmith plugins, npm, and node itself. This intrigues me, since i am interested in learning to write my own node module someday, however, today, I need to hit the ground running and get a site built now! This starter will have me populating content, building layouts, and writing sass, with live reload in the browser, in about 20 seconds.

## credit
I followed this walkthrough, and found it very helpful. I found a few things were out of date, most notably, the switch from metalsmith-templates to metalsmith-layouts, and the associated contventions, which are out-of-date in the article.  also the handlebars partialing stuff he does in node, is now handled more neatly by a metalsmith plugin.
http://www.robinthrift.com/posts/getting-to-know-metalsmith/
