(function () {
    'use strict';

    var gulp = require('gulp');
    var gulp_mobile = require('../index.js');
    var gulp_less = require('gulp-less');
    var gulp_minify = require('gulp-minify-css');

    function task() {
        gulp.src('input/**/*.less')
            .pipe(gulp_mobile())
            .pipe(gulp.dest('output/all.less'))
            .pipe(gulp_less())
            .pipe(gulp_minify({compatibility: 'ie8'}))
            .pipe(gulp.dest('output/all.css'));
    }

    gulp.task('default', task);

})();