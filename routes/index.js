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


router.get('/present', present.view);

// router.get('/', function(req, res, next) {
//     res.render('present', { title: 'Present', settings: settings, timetabledef: timetabledef, settingsdef: settingsdef });
//   });

router.get('/timetable', function(req, res, next) {
    res.render('timetable', { title: 'Timetable', settings: settings, timetabledef: timetabledef, settingsdef: settingsdef });
  });

  
  
  /* GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id) */
  router.get('/admin', auth.connect(basic), admin.admin_get);
  
  /* POST request for creating Genre. */
  router.post('/admin', auth.connect(basic), admin.admin_post);
  

  
  // Password form
router.get('/admin/password', auth.connect(basic), admin.pass_get);

// password post
router.post('/admin/password', auth.connect(basic), admin.pass_post);

router.get('/update', auth.connect(basic), update.github);

router.get('/reboot', auth.connect(basic), update.reboot);

router.get('/view', admin.view);



// MOBILE ROUTES
router.get('/', function(req, res, next) {
    
      if (req.cookies.mobset) var mobset = req.cookies.mobset
      else mobset = ['', '', '', '#ccc', '/img/paper.png', '']
      res.render('mobile', { title: 'Timetable', settings: settings, mobset:mobset, timetabledef: timetabledef, settingsdef: settingsdef, body: req.body });
      
});
    
router.post('/', function(req, res, next) {
    
    res.cookie('mobset', [req.body.analogue || '', req.body.jamaah || '', req.body.arabic || '', req.body.themecol || '#ccc', req.body.themeimg || '/img/paper.png', 'cookies agree'], { maxAge: 31556952000, httpOnly: false })//.send('Cookie is set');
    res.redirect('/')

});

  
module.exports = router;
