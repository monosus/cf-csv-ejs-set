/****************************************
 * gulpfile.js
 * for DUVETICA
 ****************************************/

/* require */
var fs = require('fs'),
    gulp = require('gulp'),
    convert = require('gulp-convert'),
    rename = require('gulp-rename'),
    ejs = require('gulp-ejs');


/****************************************
 ★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
 csv to json 用タスク
 ★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
 ****************************************/

gulp.task('csvConv', function(){
    //csvの読み込み・変換
    gulp.src('src/sitedata/csv/*.csv')
        .pipe(convert({ from: 'csv', to:'json'}))
        .pipe(rename({extname: '.json'}))
        .pipe(gulp.dest('src/sitedata/json/'));
});

gulp.task('ejs', function(){
    var jsonData01 = 'src/sitedata/json/sample-data.json',
        json01 = JSON.parse(fs.readFileSync(jsonData01, 'utf8'));

    //jsonの読み込みとejsからHTMLの出力
    for(var i = 0; i < json01.length; i++) {
        var fileName = json01[i].id;

        gulp.src('src/ejs/tmp_product.ejs')
            .pipe(ejs({
                jData01: json01[i]
            }))
            .pipe(rename(fileName + '/index.html'))
            .pipe(gulp.dest('../public/'));
    }
});