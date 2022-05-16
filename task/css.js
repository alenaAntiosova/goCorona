const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const cssimport = require('gulp-cssimport');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const groupCssMediaQueries = require('gulp-group-css-media-queries');


const path = require('../config/path');
const app = require('../config/app');

const css = () => {
   return src(path.css.src, { sourcemaps: app.isDev })
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: "Css",
            message: error.message
         }))
      }))
      .pipe(cssimport())
      .pipe(concat('style.css'))
      .pipe(cssimport())
      .pipe(autoprefixer())
      .pipe(groupCssMediaQueries())
      .pipe(rename({ suffix: "min" }))
      .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
      .pipe(csso())
      .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
}

module.exports = css;