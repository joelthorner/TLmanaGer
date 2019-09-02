var gulp = require('gulp');

const libsJs = [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/moment/min/moment.min.js',
	'node_modules/bootstrap/dist/js/bootstrap.min.js',
	'node_modules/hotkeys-js/dist/hotkeys.min.js',
	'node_modules/js-cookie/src/js.cookie.js',
	'node_modules/huebee/dist/huebee.pkgd.min.js',
	'node_modules/popper.js/dist/umd/popper.min.js',
	'node_modules/node-snackbar/dist/snackbar.min.js',
]

const scssBootstrap = [
	'node_modules/bootstrap/scss/**/*.scss'
]

const libsCss = [
	'node_modules/huebee/dist/huebee.min.css',
	'node_modules/node-snackbar/dist/snackbar.min.css',
]

gulp.task('default', function () {
	libsJs.forEach(libJs => {
		gulp.src(libJs).pipe(gulp.dest('js/libs'));
	});
	libsCss.forEach(libCss => {
		gulp.src(libCss).pipe(gulp.dest('css/libs'));
	});
	scssBootstrap.forEach(libScss => {
		gulp.src(libScss).pipe(gulp.dest('scss/bootstrap'));
	});
});

// execute for update dependencies:
// $ npm update
// $ gulp
// Execute any scss compiler (pending to do in gulp)