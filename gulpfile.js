const VERSION = "2.5.0";

var gulp = require('gulp');
var replace = require('gulp-replace');

const libsJs = [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/moment/min/moment.min.js',
	'node_modules/bootstrap/dist/js/bootstrap.min.js',
	'node_modules/hotkeys-js/dist/hotkeys.min.js',
	'node_modules/js-cookie/src/js.cookie.js',
	'node_modules/huebee/dist/huebee.pkgd.min.js',
	'node_modules/popper.js/dist/umd/popper.min.js',
	'node_modules/node-snackbar/dist/snackbar.min.js',
	'node_modules/sweetalert2/dist/sweetalert2.all.min.js',
]

const scssBootstrap = [
	'node_modules/bootstrap/scss/**/*.scss'
]

const libsCss = [
	'node_modules/huebee/dist/huebee.min.css',
	'node_modules/node-snackbar/dist/snackbar.min.css',
]

gulp.task('update-libs', function () {
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

 
gulp.task('version', function(){
  gulp.src(['package.json', 'package-lock.json'])
    .pipe(replace(/"version":\s"\d{1,3}.\d{1,3}.\d{1,3}"/, `"version": "${VERSION}"`))
		.pipe(gulp.dest('.'));

	gulp.src(['manifest.json'])
    .pipe(replace(/"version":\s"\d{1,3}.\d{1,3}.\d{1,3}"/, `"version": "${VERSION}"`))
		.pipe(gulp.dest('.'));
});

// execute for update dependencies:
// $ npm update
// $ gulp update-libs
// $ gulp version
// Execute any scss compiler (pending to do in gulp)