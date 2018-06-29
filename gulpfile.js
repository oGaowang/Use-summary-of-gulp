var gulp = require("gulp");


//把你建立的html文件压缩到自动创建的dist文件里;
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
    gulp.src('./src/*.html')
    .pipe(htmlmin({
        collapseWhitespace : true,
        removeComments : true
    })) 
    .pipe(gulp.dest('./dist'))
})

//你是使用sass预编译的css,那么gulp可以帮你预处理sass
var scss = require('gulp-sass');
var cssnano = require('gulp-cssnano');
//因为我用的是scss,所以这里注册任务写成了scss;
gulp.task('scss',function(){
    gulp.src('*.scss')
    .pipe(scss())
    .pipe(gulp.dest("dist"))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
});

//压缩js
var uglify = require('gulp-uglify');
gulp.task('js',function(){
    gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});


//优化压缩图片
var imagemin = require('gulp-imagemin');
gulp.task('image', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});

//监听你编写的那些文件们，就可以实时的改变压缩到dist文件里的文件代码了
gulp.task('watch',['scss','js','html','image'],function(){
    gulp.watch('*.scss',['scss']);
    gulp.watch('src/*.js',['js']);
    gulp.watch('src/img/*.*',['image']);
    gulp.watch('src/*.html',['html']);
})

gulp.task("default",["html","scss","image","js","watch"],function(){
    console.log('gulp启动成功');
    gulp.start("html","scss","image","js","watch")
    console.log('gulp启动成功......');
})