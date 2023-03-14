const express = require('express');
const router = express.Router();

const { createCollege, getCollegeDetils } = require('../controllers/collegeController');
const { createIntern } = require('../controllers/internController');

// college routes -- 
router.post('/functionup/college', createCollege);
router.get('/functionup/college', getCollegeDetils);

// intern routes -- 
router.post('/functionup/interns', createIntern);

// to handle all unexpected end points -- 
router.all('/*', function (req, res) {
    res.status(404).send({ status: false, message: 'Error: page not found' });
});

module.exports = router;