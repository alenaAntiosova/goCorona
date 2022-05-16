const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

const path = require('./config/path');
const app = require('./config/app')

const html = require('./task/html');
const clear = require('./task/clear');
//const css = require('./task/css');
const scss = require('./task/scss');
const js = require('./task/js');
const img = require('./task/img');
const font = require('./task/font');

const server = () => {
   browserSync.init({
      server: {
         baseDir: path.root
      }
   })
}

const watcher = () => {
   watch(path.html.watch, html).on('all', browserSync.reload);
   watch(path.scss.watch, scss).on('all', browserSync.reload);
   watch(path.js.watch, js).on('all', browserSync.reload);
   watch(path.img.watch, img).on('all', browserSync.reload);
   watch(path.font.watch, font).on('all', browserSync.reload);
}


//задачи
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;

// сборка


const build = series(
   clear,
   parallel(html, scss, img, js, font),
)

const dev = series(
   build,
   parallel(watcher, server)
)

exports.default = app.isProd
   ? build
   : dev;