var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    stripDebug = require('gulp-strip-debug'),
    concat = require('gulp-concat'),
    deporder = require('gulp-deporder'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    connect = require('gulp-connect'),
    gulpclean = require('gulp-htmlclean');
var folder = {
    src:'src/',
    dist:'dist/'
}
var env = false;

gulp.task('html',function(){
    var js = gulp.src(folder.src + 'html/index.html')
                //  .pipe(connect.reload())
    if(env){
        js.pipe(gulpclean())
    } 
    js.pipe(gulp.dest(folder.dist + 'html/'))
})
gulp.task('image',function(){
    gulp.src(folder.src + 'image/*')
        .pipe(connect.reload())
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + 'image/'))
})
gulp.task('js',function(){
    var js = gulp.src(folder.src + 'js/*.js')
                 .pipe(connect.reload())
    if(env){
        js.pipe(deporder())
          .pipe(stripDebug())
          .pipe(uglify())
    }
        
        js.pipe(gulp.dest(folder.dist + 'js/'))
})
gulp.task('css',function(){
    var css = gulp.src(folder.src + 'css/*.less')
        .pipe(connect.reload())
        .pipe(less())
    if(env){
        css.pipe(postcss([autoprefixer,cssnano]))
    }
        
        css.pipe(gulp.dest(folder.dist + 'css/'))
})
gulp.task('connect',function(){
    connect.server();
})
gulp.task('watch',function(){
    gulp.watch(folder.src + 'html/*',['html']);
    gulp.watch(folder.src + 'js/*',['js']);
    gulp.watch(folder.src + 'css/*',['css']);
    // gulp.watch(folder.src + 'image/*',['image']);
})


gulp.task('default',['html','image','js','css','connect','watch'])