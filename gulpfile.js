var gulp = require('gulp')
var babel = require('gulp-babel')
var nodemon = require('gulp-nodemon')
var scss = require('gulp-sass')

gulp.task('js', function() {
	return gulp.src('./src/**/*.js')
	.pipe(babel({ presets: ['env'] }))
	.on('error', onError)
	.pipe(gulp.dest('./dist/'));
});

function onError(err) {
	console.log(err)
	this.emit('end')
}

gulp.task('scss', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('views', function() {
	return gulp.src('./src/views/**/*.*')
		.pipe(gulp.dest('./dist/views'))
})

gulp.task('scss:watch', function () {
	console.log('scsswatch')
  gulp.watch('./src/scss/**/*.scss', ['scss']);
});

gulp.task('nodemon', function () {
	nodemon({
		script: './dist/server.js',
		ext: 'js html'
	})
	.on('start', function () {
		console.log('nodemon started')
	})
})

gulp.task('watch', function() {
	gulp.watch('./src/**/*.js', ['js'])
	gulp.watch('./src/views/**/*.*', ['views'])
})

gulp.task('default', ['scss:watch','watch','views','js','nodemon'])
