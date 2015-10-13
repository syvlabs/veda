var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync');

var paths = {
    js: './*(routes|public)/**/*.js',
    dev: './*(routes|public|views|resources)/**/*'
};

gulp.task('default', ['watch', 'browser-sync']);

gulp.task('jshint', function() {
    return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
    watch(paths.js, function(){
        gulp.start('jshint');
    });
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: [paths.dev],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('nodemon', function (callback) {
	var started = false;
	return nodemon({
		script: './bin/www'
	}).on('start', function () {
		if (!started) {
			callback();
			started = true;
		}
	});
});
