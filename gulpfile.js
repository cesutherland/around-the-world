var gib = require('gib');
var gulp = require('gulp');

var config = {
  build: './public',
  server: {
    port: 3020,
    livereload: {
      port: 30520
    }
  },
  less: {
    'index.css': {
      paths: [
        './node_modules',
      ],
      src: './app/index.less'
    }
  },
  js: {
    'index.js': {
      src: './app/index.js',
      browserify: {
        require: './app/index.js'
      }
    }
  },
  index: {
    'index.html': {
      src: 'app/index.html'
    }
  }
};

gib.gulpfile(config, gulp);
