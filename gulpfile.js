const gulp = require('gulp');
const clean = require('gulp-clean');
const sync = require('browser-sync');
const svgo = require('gulp-svgo');
const woff = require('gulp-ttf2woff');
const woff2 = require('gulp-ttf2woff2');
const less = require('gulp-less');
const concat = require('gulp-concat');

exports.default = gulp.series(cleaner, pages, styles, scripts, images, fonts, watcher);

function pages() {
    return gulp.src('./source/*.html')
        .pipe(gulp.dest('./build'))
    .pipe(sync.stream())
}
exports.pages = pages;

function styles() {
    return gulp.src('./source/styles/**/*.less')
        .pipe(concat('styles.min.less'))
        .pipe(less())
        .pipe(gulp.dest('./build/styles'))
        .pipe(sync.stream())
}
exports.styles = styles;

function scripts() {
    return gulp.src('./source/scripts/**/*.js')
        .pipe(concat('./scripts.min.js'))
        .pipe(gulp.dest('./build/scripts'))
        .pipe(sync.stream())
}
exports.scripts = scripts;

function images() {
    return gulp.src('./source/images/*.{png,jpeg,jpg,svg}')
        .pipe(svgo())
        .pipe(gulp.dest('./build/images'))
        .pipe(sync.stream())
}
exports.images = images;

function fonts() {
    return gulp.src('./source/fonts/*.ttf')
        .pipe(gulp.dest('./build/fonts'))
        .pipe(woff())
        .pipe(gulp.dest('./build/fonts')),

        gulp.src('./source/fonts/*.ttf')
            .pipe(woff2())
            .pipe(gulp.dest('./build/fonts'))
}
exports.fonts = fonts;

function watcher() {
    sync.init({
        server: './build',
        online: true,
        tunnel: 'axiomics',
        notify: false
    })

    gulp.watch('./source/*.html', pages)
    gulp.watch('./source/styles/**/*.less', styles)
    gulp.watch('./source/scripts/**/*.js', scripts)
    gulp.watch('./source/images/*.{png,jpeg,jpg,svg}', images)
}
exports.watcher = watcher;

function cleaner() {
    return gulp.src('./build/*')
        .pipe(clean())
}
exports.cleaner = cleaner;