const { src,dest,series,watch } = require("gulp")
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const plugins = require('gulp-load-plugins')()


//压缩js uglifyjs
function js(cb){
    src('js/*.js')
    .pipe(plugins.uglify())
    .pipe(dest('./dest/js'))
    .pipe(reload({stream:true}))
    cb()
}

//对scss/less进行压缩编译
function css(cb){
    src('css/*.css')
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.autoprefixer({
        cascade:false,
        remove:false
    }))
    .pipe(dest('./dist/css'))
    .pipe(reload({stream:true}))
    cb()
}

// //监听文件变化
function watcher(){
    watch('js/*.js',js)
    watch('css/*.css',css)
}

//删除dist目录下面的内容
function dist(cb){
    del('./dist')
    cb()
}

//热更新
function serve(cb){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    })
    cb()
}

exports.script = js
exports.style = css
exports.clean = dist
exports.default = series([
  clean,
  js,
  css,
  serve,
  watcher  
])