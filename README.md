# gulp-mobile-first

## What does it do
This gulp plugin is created to autocompile media queries. Perfect for bigger mobile first projects.

## How to use

```
var gulp_mobile = require('gulp_mobile');
```

### Example folder structure of project
- app
  - home
    - style
      - home.less
      - home.mobile.less
      - home.desktop.less
  - about
    - style
      - about.less
      - about.mobile.less
      - about.desktop.less
      
### Example gulpfile
```
gulp.src('input/**/*.less')
  .pipe(gulp_mobile())
  .pipe(gulp.dest('output/all.less'))
  .pipe(gulp_less())
  .pipe(gulp_minify({compatibility: 'ie8'}))
  .pipe(gulp.dest('output/all.css'));
```

### Change width limit
Add `{mobile: <width>}` as option to the task
