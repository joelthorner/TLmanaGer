var gulp = require('gulp');

const libsJs = [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/moment/min/moment.min.js'
]

const libsCss = [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/moment/min/moment.min.js'
]

gulp.task('default', function () {
	libsJs.forEach(libJs => {
		gulp.src(libJs).pipe(gulp.dest('js/libs'));
	});
	libsCss.forEach(libCss => {
		gulp.src(libCss).pipe(gulp.dest('css/libs'));
	});
});

// execute for update dependencies --> gulp