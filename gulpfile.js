"use strict;"

const gulp           = require('gulp');
const filter         = require('gulp-filter');
const concat         = require('gulp-concat');
const mainBowerFiles = require('main-bower-files');
const uglify         = require('gulp-uglify');
const babel          = require('gulp-babel');
const gutil          = require('gulp-util');
const pump           = require('pump');
const ngAnnotate     = require('gulp-ng-annotate');
const order          = require('gulp-order');
const del            = require('del');
const sourcemaps     = require('gulp-sourcemaps');
const sass           = require('gulp-sass');
const browserSync    = require('browser-sync').create();

const paths = {
	html:{
		input: 'client/html/**/*.html',
		output: 'public/html'
	},
	css:{
		input: ['client/css/**/*.css','client/css/**/*.scss','client/css/**/*.sass'],
		output: 'public/css'
	},
	js:{
		input: 'client/js/**/*.js',
		output: 'public/js'
	},
	fonts:{
		input: 'client/fonts/**/*',
		output: 'public/fonts'
	}
}

gulp.task('bow', function(cb){
	console.log(mainBowerFiles());
});

gulp.task('js',['clean:js'], function(cb){
	const jsFiles = [paths.js.input];
	pump([	
		gulp.src(mainBowerFiles('**/*.js').concat(jsFiles)),
		sourcemaps.init(),
		order([
			"**/jquery.js",
			"**/bootstrap.js",
			"**/angular.js",
			"**/angular-cookies.js",
			"**/modules/*.js",
			"**/*.js",
		]),
		concat('main.js'),

		// ngAnnotate(),
		// babel({
		// 	presets:['es2015']
		// }),
		// uglify(),
    //
		sourcemaps.write(),
		gulp.dest(paths.js.output),
		browserSync.reload({stream:true})
	],
	cb
	);
});

gulp.task('css',['clean:css'], function(cb){
	const cssFiles = paths.css.input;
	pump([	
		gulp.src(mainBowerFiles('**/*.css').concat(cssFiles)),
		order([
			"**/bootstrap.css",
			"**/*.css",
		]),
		concat('style.css'),
		sass(),
		gulp.dest(paths.css.output),
		browserSync.reload({stream:true})
	],
	cb
	);
})

gulp.task('html',['clean:html'], function(cb){
	pump([	
		gulp.src([paths.html.input]),
		gulp.dest(paths.html.output),
		browserSync.reload({stream:true})
	],
	cb
	);
})

gulp.task('fonts',['clean:fonts'], function(cb){
	pump([	
		gulp.src([paths.fonts.input]),
		gulp.dest(paths.fonts.output)
	],
	cb
	);
})

gulp.task('clean:html', function() {
	return del([paths.html.output])
})

gulp.task('clean:css', function() {
	return del([paths.css.output])
})

gulp.task('clean:js', function() {
	return del([paths.js.output])
})

gulp.task('clean:fonts', function() {
	return del([paths.fonts.output])
})




gulp.task('watch:html', function(){
	return gulp.watch([paths.html.input],['html'])
})

gulp.task('watch:css', function(){
	return gulp.watch([paths.css.input],['css'])
})

gulp.task('watch:js', function(){
	return gulp.watch([paths.js.input],['js'])
})


gulp.task('serve', function () {
	browserSync.init(null, {
		proxy: 'http://localhost:8000'
	});
});


gulp.task('build', ['js','css','html','fonts']);
gulp.task('watch', ['watch:js','watch:css','watch:html']);
gulp.task('default', ['build','watch','serve']);


