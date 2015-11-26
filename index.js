var metalsmith = require('metalsmith');

var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var inplace = require('metalsmith-in-place');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var sass = require('metalsmith-sass');
var fingerprint = require('metalsmith-fingerprint-ignore');
var metadata = require('metalsmith-metadata');
var include = require('metalsmith-include');

var handlebars = require('handlebars');

metalsmith(__dirname)
  .destination('./build')
  .use(markdown())
  .use(metadata({
    config: 'config.yaml'
  }))
  .use(include({
    deletePartials: true
  }))
  .use(inplace({
    engine: 'handlebars'
  }))
  .use(layouts({
    engine: 'handlebars',
    partials: './layouts/partials'
  }))
  .use(sass({
      sourceMap: true
  }))
  .use(permalinks({
      pattern: ':title'
  }))
  .use(serve({
      port: 9999,
      verbose: true,
      http_error_files: {
        404: "/404/index.html"
      },
      redirects: {
        '/old_url.php'        : '/new_url/',
        '/old_url.php?lang=en': '/en/new_url/'
      }
  }))  
  .use(
      watch({
        paths: {
          //"${source}/**/*": true, // every changed files will trigger a rebuild of themselves
          "index.js": "**/*",
          "${source}/*": "**/*",
          "${source}/**/*": "**/*", // every source changed will trigger a rebuild of all files
          "${source}/**/": "**/*", // every source changed will trigger a rebuild of all files
          "layouts/**/*": "**/*", // every templates changed will trigger a rebuild of all files
          "layouts/*": "**/*", // every templates changed will trigger a rebuild of all files
        },
        livereload: true
      })
    )
  .use(collections({
      page: {
          sortBy: 'order'
      },
      posts: {
          sortBy: 'date'
      }      
  }))  
  .use(fingerprint({ 
    pattern: 'css/all.css',
    keep: true
  }))
  .build(function(err){
  if (err) throw err;
});