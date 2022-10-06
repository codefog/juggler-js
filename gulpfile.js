'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

exports.eslint = function () {
    return gulp.src(['src/juggler.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

exports.default = function () {
    return gulp.src('src/juggler.js')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'));
};
