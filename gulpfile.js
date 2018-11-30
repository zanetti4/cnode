const gulp = require("gulp");
const less = require("gulp-less");

//测试 gulp
gulp.task('hello', function(){
    console.log('hello gulp');
});

//less文件转化
gulp.task('less_change_css', function(){
    return gulp.src('src/assets/css/*.less')
    .pipe(less())
    .pipe(gulp.dest("src/assets/css"));
});

//监听所有less发生变化，less_change_css执行，实时更新css
gulp.task('updateLess', function(){
    return gulp.watch("src/assets/css/*.less", ["less_change_css"]);
});