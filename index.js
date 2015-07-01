(function (module) {
    'use strict';

    var _ = require('lodash');
    var parseCss = require('parseCss');
    var path = require('path');
    var through = require('through2');
    var gulpOptions = {};

    // TODO Look for multiple files
    function transform(files, enc, cb) {
        var totalResult = '';

        files.forEach(function (file) {
            var filename = path.relative(file.cwd, file.path);
            var source = file.contents.toString('utf8');

            var mobileHeader = '@media screen and (max-width: ' + gulpOptions.mobile - 1 + ') {';
            var mobileFooter = '}';

            var desktopHeader = '@media screen and (min-width: ' + gulpOptions.mobile + ') {';
            var desktopFooter = '}';

            if (_.endsWith(filename, '.mobile.less')
                || _.endsWith(filename, '.mobile.sass')
                || _.endsWith(filename, '.mobile.css')
            ) {
                totalResult += "\n\n";
                totalResult += mobileHeader + "\n";
                totalResult += source + "\n";
                totalResult += mobileFooter;
            } else if (_.endsWith(filename, '.desktop.less')
                || _.endsWith(filename, '.desktop.sass')
                || _.endsWith(filename, '.desktop.css')) {
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
        });

        // TODO change
        cb(totalResult);
    }

    function gulpMobileFirst(options) {
        gulpOptions = options || {};
        gulpOptions.mobile = gulpOptions.mobile || 800;

        // TODO tablet

        through.obj(transform);
    }

    module.exports = gulpMobileFirst;

})(module);