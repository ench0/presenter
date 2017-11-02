const settings = require('../config');
const settingsdef = "var settings="+JSON.stringify(settings);

const timetable = require('prayer-timetable').timetable;
const timetabledef = "var timetable="+JSON.stringify(timetable);

const jsonfile = require('jsonfile');
const S = require('string');

const mysql      = require('mysql');
const connparams = require('../config/db');
const connection = mysql.createConnection(connparams);

connection.query('USE icci');

// Edit form on GET
exports.view = function(req, res, next) {

    // connection.query('SELECT DISTINCT pages.id AS id, pages.name AS url, pages.status AS status, field_title.data AS title, field_title.pages_id AS title_id, field_poster.pages_id AS poster_id, field_poster.data AS poster FROM pages, field_poster, field_title WHERE (pages.status=1 AND pages.id=field_title.pages_id) ORDER BY pages.id DESC LIMIT 5', function(err, rows) {
 
    // connection.query(
    //   'SELECT DISTINCT pages.id AS id, pages.name AS url, pages.status AS status, '
    //   +'field_title.data AS title, field_title.pages_id AS title_id, '
    //   // +'field_poster.pages_id AS poster_id, field_poster.data AS poster '
    //   +'FROM pages, field_title '//field_poster,
    //   // +'LEFT JOIN '
    //   +'WHERE (pages.status=1 AND pages.id=field_title.pages_id) '// AND field_poster.data=1
    //   +'ORDER BY pages.id DESC '
    //   +'LIMIT 5', function(err, rows) {

    connection.query(
        'SELECT pages.id, pages.name, pages.parent_id, pages.status, field_images.data AS image, field_title.data AS title, field_body.data AS body, field_poster.data AS poster, YEAR(field_date.data) as year, MONTH(field_date.data) as month, DAY(field_date.data) as day '
        +'FROM pages '
        +'LEFT JOIN field_images ON (pages.id = field_images.pages_id AND (field_images.data = 0) ) '
        +'JOIN field_title ON (pages.id = field_title.pages_id) '
        +'JOIN field_body ON (pages.id = field_body.pages_id) '
        +'JOIN field_date ON (pages.id = field_date.pages_id) '
        +'LEFT JOIN field_poster ON (pages.id = field_poster.pages_id) '
        +'WHERE '
        +'pages.parent_id = 1022 '
        +'AND field_images.pages_id IS NOT NULL '
        +'AND pages.status = 1 '
        +'AND field_poster.data IS NOT NULL '
        +'GROUP BY pages.id '
        +'ORDER BY pages.id DESC '
        +'LIMIT 4; '
        +'SELECT pages.id, pages.name, pages.parent_id, pages.status, field_images.data AS image, field_title.data AS title, field_body.data AS body, field_poster.data AS poster, YEAR(field_date.data) as year, MONTH(field_date.data) as month, DAY(field_date.data) as day '
        +'FROM pages '
        +'LEFT JOIN field_images ON (pages.id = field_images.pages_id AND (field_images.data = 0) ) '
        +'JOIN field_title ON (pages.id = field_title.pages_id) '
        +'JOIN field_body ON (pages.id = field_body.pages_id) '
        +'JOIN field_date ON (pages.id = field_date.pages_id) '
        +'LEFT JOIN field_poster ON (pages.id = field_poster.pages_id) '
        +'WHERE '
        +'pages.parent_id = 1022 '
        +'AND field_images.pages_id IS NOT NULL '
        +'AND pages.status = 1 '
        +'AND field_poster.data IS NULL '
        +'GROUP BY pages.id '
        +'ORDER BY pages.id DESC '
        +'LIMIT 3; '
        +'SELECT pages.id, field_gallery.data AS image, field_title.data AS title '
        +'FROM pages '
        +'LEFT JOIN field_gallery ON (pages.id = field_gallery.pages_id AND (field_gallery.data = 0) ) '
        +'JOIN field_title ON (pages.id = field_title.pages_id) '
        +'JOIN field_date ON (pages.id = field_date.pages_id) '
        +'WHERE '
        +'pages.parent_id = 1022 '
        +'AND field_gallery.pages_id IS NOT NULL '
        +'AND pages.status = 1 '
        +'ORDER BY pages.id DESC '
        +'LIMIT 100'
        , [1, 2, 3],
        function(err, rows) {

            // var message = null;
            // console.log('rows!!!'+rows);
            // console.log(req.query.message);

            var message = req.query.message;

            // console.log("rows:", rows)
            // console.log("err:", err)
            
            res.render('present', { title: 'Present', settings: settings, timetabledef: timetabledef, rows: rows, S: S, settingsdef: settingsdef});
            
            // res.render('present', { title: 'Present', time: time, body: req.body, message: message, rows: rows, timedef: timedef, S: S });

    });
};



// router.get('/', function(req, res, next) {
//     res.render('present', { title: 'Present', settings: settings, timetabledef: timetabledef, settingsdef: settingsdef });
//   });