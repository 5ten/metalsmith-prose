const gulp        = require('gulp');
const metalsmith  = require('gulp-metalsmith');
const imagemin    = require('gulp-imagemin');
const notify      = require('gulp-notify');
const plumber     = require('gulp-plumber');
const favicons    = require("gulp-favicons");
const gulpCopy    = require('gulp-copy');
const watch       = require('gulp-watch');
const sass        = require('gulp-sass');

var markdown      = require('metalsmith-markdown');
var layouts       = require('metalsmith-layouts');
var collections   = require('metalsmith-collections');
var permalinks    = require('metalsmith-permalinks');
var metadata      = require('metalsmith-metadata');
var include       = require('metalsmith-include');
var tojson        = require('metalsmith-to-json');
var writemetadata = require('metalsmith-writemetadata');

var handlebars    = require('handlebars');

handlebars.registerHelper('cleanTitle', function(str) {
  if (str) {
    return str.toLowerCase().replace("'", "-").replace(' ','-').replace('|','-');
  } else {
    return;
  }
});

handlebars.registerHelper('imgL', function(str) {
  return '//res.cloudinary.com/fiveten/image/upload/c_scale,q_auto:good,w_1500/'+str+'.jpg';
});

handlebars.registerHelper('imgS', function(str) {
  return '//res.cloudinary.com/fiveten/image/upload/c_scale,q_auto:good,w_1000/'+str+'.jpg';
});

handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

// use this: {{#each_upto this 5}}

var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;

var src = {
    scss: ['src/css/*.scss', 'src/css/**/*.scss'],
    css:  'build/css',
    html: ['build/**/*.html', 'build/index.html']
};

gulp.task('reload', ['metalsmith'], function() {
    return browserSync.reload();
});

gulp.task('watch', function() {
    return gulp.watch(
        [ './layouts/**/*.html',
          './src/content/*.md',
          './src/content/**/*.md',
          './src/scripts/*.js',
          './layouts/*.html'
        ], 
          ['reload']
        );
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {

    var onError = function(err) {

      notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Bottle"
      })(err);

      this.emit('end');
    };


    return gulp.src(src.scss)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(notify({
           title: 'Gulp',
           subtitle: 'success',
           message: 'Sass task',
           sound: "Pop"
        }))
        .pipe(reload({stream: true}));
});

gulp.task('favicons', () =>
    gulp.src('src/images/logo.png')
        .pipe(favicons({
        html: "favicons.html",
        path: "/favicons/favicons",
        pipeHTML: true,
        debug: true,
        replace: true,
        icons: {
            android: true,              // Create Android homescreen icon. `boolean`
            appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset: offsetInPercentage }`
            appleStartup: false,         // Create Apple startup images. `boolean`
            coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset: offsetInPercentage }`
            favicons: true,             // Create regular favicons. `boolean`
            firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset: offsetInPercentage }`
            windows: true,              // Create Windows 8 tile icons. `boolean`
            yandex: false                // Create Yandex browser icon. `boolean`
        }       
    }))
    .pipe(gulp.dest("./src/favicons"))
);

gulp.task('metalsmith', function() {
  return gulp.src('src/**')
    .pipe(metalsmith({

      ignore: ['src/css/','src/css/**'],

      use: [

        metadata({
          site: 'content/settings/site.yaml',
          social: 'content/settings/social.yaml'      
        }),


        collections({
          pages: {
            sortBy: 'order'
          },
          projects: {
            sortBy: 'order',
            pattern: '/projects/*.md',
          },
          news: {
            pattern: '/news/*.md',
          }          
        }),

        include({
          deletePartials: true
        }),

        markdown(),

        writemetadata({
          collections: {
            projects: {
              output: {
                path: 'json-indexes/projects.json',
                asObject: true,
                metadata: {
                  "type": "list"
                }
              },
              ignorekeys: ['contents', 'next', 'previous', '_vinyl', 'stat', 'layout', 'collection']
            },
            news: {
              output: {
                path: 'json-indexes/news.json',
                asObject: true,
                metadata: {
                  "type": "list"
                }
              },
              ignorekeys: ['contents', 'next', 'previous', '_vinyl', 'stat', 'layout', 'collection']
            },
            pages: {
              output: {
                path: 'json-indexes/pages.json',
                asObject: true,
                metadata: {
                  "type": "list"
                }
              },
              ignorekeys: ['contents', 'next', 'previous', '_vinyl', 'stat', 'layout', 'collection']
            }
          }
        }),

        permalinks({
            pattern: ':title'
        }),

        layouts({
          engine: 'handlebars',
          partials: './layouts/partials'
        })


      ]
    }))
    .pipe(gulp.dest('build'));

});

gulp.task('jsonpages', function() {
  return gulp.src(
      [
        'src/content/pages/*.md',
        'src/content/projects/*.md',
        'src/content/news/*.md'
      ]
    )
    .pipe(metalsmith({
      use: [
        markdown(),
        tojson({
          outputPath: 'json'
          }),
      ]
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('jsonindexes', function() {
  return gulp.src(
      [
        'src/**'
      ]
    )
    .pipe(metalsmith({
      use: [
        markdown(),
        tojson({
            outputPath: 'json',
            createIndexes : true,
            indexPaths : ['/projects', '/news', '/pages'],
            onlyOutputIndex : true
        }),
      ]
    }))
    .pipe(gulp.dest('build/json'));
});


gulp.task('imagemin', () =>
    gulp.src('src/content/media/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/content/media'))
);

gulp.task('default', ['metalsmith', 'sass', 'jsonindexes', 'jsonpages', 'imagemin', 'serve', 'watch']);
gulp.task('build', ['metalsmith', 'sass', 'jsonindexes', 'jsonpages', 'imagemin']);


