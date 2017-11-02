const express = require('express');
const router = express.Router();
const settings = require('../config');
const settingsdef = "var settings="+JSON.stringify(settings);

// const settings = require('prayer-timetable').settings;
const timetable = require('prayer-timetable').timetable;
const timetabledef = "var timetable="+JSON.stringify(timetable);

const admin = require('prayer-timetable').admin;
const update = require('prayer-timetable').update;

const present = require('../controllers/present');


const auth = require('http-auth');
var basic = auth.basic({
    realm: "Admin Area",
    file: __dirname + "/../config/user.pass"
});


router.get('/', present.view);

// router.get('/', function(req, res, next) {
//     res.render('present', { title: 'Present', settings: settings, timetabledef: timetabledef, settingsdef: settingsdef });
//   });

router.get('/timetable', function(req, res, next) {
    res.render('timetable', { title: 'Timetable', settings: settings, timetabledef: timetabledef, settingsdef: settingsdef });
  });
  router.get('/mobile', function(req, res, next) {
    res.render('mobile', { title: 'Timetable', settings: settings, timetabledef: timetabledef, settingsdef: settingsdef });
  });
  
  
  /* GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id) */
  router.get('/admin', auth.connect(basic), admin.admin_get);
  
  /* POST request for creating Genre. */
  router.post('/admin', auth.connect(basic), admin.admin_post);
  
  router.get('/update', auth.connect(basic), update.github);
  
  router.get('/reboot', auth.connect(basic), update.reboot);
  
  router.get('/view', admin.view);

  
module.exports = router;
