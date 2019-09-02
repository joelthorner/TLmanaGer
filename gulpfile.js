var gulp = require('gulp');

const libsJs = [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/moment/min/moment.min.js',
	'node_modules/bootstrap/dist/js/bootstrap.min.js',
	'node_modules/hotkeys-js/dist/hotkeys.min.js',
]

const scssBootstrap = [
	'node_modules/bootstrap/scss/**/*.scss'
]

gulp.task('default', function () {
	libsJs.forEach(libJs => {
		gulp.src(libJs).pipe(gulp.dest('js/libs'));
	});
	scssBootstrap.forEach(libScss => {
		gulp.src(libScss).pipe(gulp.dest('scss/bootstrap'));
	});
});

// execute for update dependencies:
// $ npm update
// $ gulp
// Execute any scss compiler (pending to do in gulp)