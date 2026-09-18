'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
// var uglify = require('gulp-uglify');
var terser = require('gulp-terser')
var rename = require('gulp-rename');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

// Task: generate the engagement image list JSON
// This runs the `generateEngPics.js` script which scans `img/eng_pics/`
// and writes `img/eng_pics.json`. The generated file is then used by
// `scripts.js` at runtime.
gulp.task('generate-pics', function (cb) {
    const exec = require('child_process').exec;
    exec('node generateEngPics.js', function (err, stdout, stderr) {
        if (err) {
            console.error('Error generating eng_pics.json:', stderr);
            cb(err);
            return;
        }
        console.log('Generated eng_pics.json');
        cb();
    });
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        // .pipe(uglify())
        .pipe(terser())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// After the build is complete, start a simple HTTP server on port 8000.
// This is convenient for local development/testing but should be removed
// from CI pipelines or production builds.
gulp.task('serve', function () {
    const { exec } = require('child_process');
    // eslint-disable-next-line no-console
    console.log('Starting HTTP server on http://localhost:8000');
    return new Promise((resolve, reject) => {
        const server = exec('python -m http.server 8000', (err, stdout, stderr) => {
            if (err) {
                console.error('Server exited with error:', stderr);
                reject(err);
                return;
            }
            console.log(stdout);
        });
        server.on('close', (code) => {
            console.log('HTTP server exited with code', code);
            resolve();
        });
    });
});

// default task – first generate the image list, then build assets and start the
// HTTP server.  The server task keeps the Gulp process alive until the server
// exits (e.g., by pressing Ctrl+C).
gulp.task('default', gulp.series('generate-pics', 'sass', 'minify-js', 'serve'));
