const express = require('express');
const router = express.Router();
const settings = require('../config');

// const settings = require('prayer-timetable').settings;
const timetable = require('prayer-timetable').timetable;

router.get('/timetable', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.json(timetable);
})

router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.json({name: "ICCI Timetable", paths: ["timetable", "timetable/M", "timetable/M/D", "settings"]});
})

router.get('/settings', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.json(settings);
})

router.get('/timetable/:month', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.params.month)
    var month = req.params.month
    res.json(timetable[month]);
})

router.get('/timetable/:month/:day', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.params.month)
    var month = req.params.month
    var day = req.params.day
    res.json(timetable[month][day]);
})

module.exports = router;
