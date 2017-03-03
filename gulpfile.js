var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    stripCssComments = require('gulp-strip-css-comments'),
    uncss = require('gulp-uncss');

var currentfolder = "./" + "excursions"

var paths = {
    sass: currentfolder + "/scss/*.scss",
    css: currentfolder + "/css/*.css",
    outputDirectory: currentfolder + "/css"
};


gulp.task('default', function() {
    return gulp.src(paths.sass)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(stripCssComments({preserve: false}))
        .pipe(uncss({
            html: [currentfolder + '/index.html'],
            //ignore: ['#uniDisclaimer', '.uniDisclaimerRightCA', '.uniDisclaimerLeftCA']
            ignore: [new RegExp('^.uni.*'),
            new RegExp('^#uni.*')]
        }))
        .pipe(gulp.dest(paths.outputDirectory))
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['default'])
});

