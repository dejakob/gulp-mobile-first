(function (module) {
    'use strict';

    var _ = require('lodash');
    var path = require('path');
    var through = require('through2');
    var gutil = require('gulp-util');
    var File = gutil.File;
    var gulpOptions = {};
    var totalResult = '';

    function transform(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        var filename = '' + file.path;
        var source = file.contents.toString('utf8');
        var mobileHeader = '@media screen and (max-width: ' + (gulpOptions.mobile - 1) + 'px) {';
        var mobileFooter = '}';

        var desktopHeader = '@media screen and (min-width: ' + gulpOptions.mobile + 'px) {';
        var desktopFooter = '}';

        if (source.trim().length) {
            if (_.endsWith(filename, '.mobile.less')
                || _.endsWith(filename, '.mobile.sass')
                || _.endsWith(filename, '.mobile.css')
            ) {
                source = source.replace(/\@width/gi, (gulpOptions.mobile - 1) + 'px');

                totalResult += "\n\n";
                totalResult += mobileHeader + "\n";
                totalResult += source + "\n";
                totalResult += mobileFooter;
            } else if (_.endsWith(filename, '.desktop.less')
                || _.endsWith(filename, '.desktop.sass')
                || _.endsWith(filename, '.desktop.css')) {
                source = source.replace(/\@width/gi, gulpOptions.mobile + 'px');

                totalResult += "\n\n";
                totalResult += desktopHeader + "\n";
                totalResult += source + "\n";
                totalResult += desktopFooter;
            } else if (_.endsWith(filename, '.less')
                || _.endsWith(filename, '.sass')
                || _.endsWith(filename, '.css')) {
                totalResult += "\n\n";
                totalResult += source + "\n";
            }
        }

        cb();
    }

    function end(cb) {
        var tempFile = new File();
        tempFile.path = '.';
        tempFile.contents = new Buffer(totalResult);

        this.push(tempFile);
        cb(null, tempFile);
    }

    function gulpMobileFirst(options) {
        totalResult = '';
        gulpOptions = options || {};
        gulpOptions.mobile = gulpOptions.mobile || 800;

        // TODO tablet

        return through.obj(transform, end);
    }

    module.exports = gulpMobileFirst;

})(module);