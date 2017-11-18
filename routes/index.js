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

const fs = require('fs-extra')
const confdir = './config'

const passfile = './config/user.pass'

const dbdir = './public/db'
const cityfile = './public/db/city.js'
const settingsfile = './public/db/settings.js'


// check browser city file
if (fs.existsSync(cityfile) && fs.statSync(cityfile).size>0) {
    console.log("#####city file ok#####")
    console.log("city file size: "+fs.statSync(cityfile).size)
}
else {
    console.log("#####city write#####")
    fs.ensureDirSync(dbdir)
    fs.writeFileSync(cityfile, timetabledef)
}

// check browser settings file
if (fs.existsSync(settingsfile) && fs.statSync(settingsfile).size>0) {
    console.log("#####settings file ok#####")
    console.log("settings file size: "+fs.statSync(settingsfile).size)
}
else {
    console.log("#####settings write#####")
    fs.ensureDirSync(dbdir)        
    fs.writeFileSync(settingsfile, settingsdef)
}



// check user pass file
if (fs.existsSync(passfile) && fs.statSync(passfile).size>0) {
  console.log("#####pass file ok#####")
  console.log("pass file size: "+fs.statSync(passfile).size)
}
else {
  console.log("#####pass write#####")
  fs.ensureDirSync(confdir)    
  fs.writeFileSync(passfile, 'admin:$2a$10$XNuKAWZ6Qx/pXnYGkRT67OKJ8RlVTHdOZOw6nIC0CNg5Y1JbJy2r6')
}



const basic = auth.basic({
    realm: "Admin Area",
    // file: __dirname + "/user.pass"
    file: "./config/user.pass"
});




router.get('/present', present.view);


router.get('/timetable', function(req, res, next) {
  res.render('timetable', { title: 'Timetable', settings: settings, timetabledef: timetabledef, settingsdef: settingsdef });
});
router.get('/simple', function(req, res, next) {
  res.render('simple', { title: 'Timetable', settings: settings, timetabledef: timetabledef, settingsdef: settingsdef, time: true });
});


// MOBILE ROUTES
router.get('/', function(req, res, next) {

  if (req.cookies.mobset) var mobset = req.cookies.mobset
  else mobset = ['', '', '', '#cc9933', '/img/marble.jpg', '']
  res.render('mobile', { title: 'Timetable', settings: settings, mobset:mobset, timetabledef: timetabledef, settingsdef: settingsdef, body: req.body });
  
});

router.post('/', function(req, res, next) {
 
  res.cookie('mobset', [req.body.analogue || '', req.body.jamaah || '', req.body.arabic || '', req.body.themecol || '#cc9933', req.body.themeimg || '/img/marble.jpg', 'cookies agree'], { maxAge: 31556952000, httpOnly: false })//.send('Cookie is set');
  res.redirect('/')

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



module.exports = router;
