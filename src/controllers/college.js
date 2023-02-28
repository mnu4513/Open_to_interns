const collegeModel = require('../models/college');
const internModel = require('../models/intern');
const { validName, validFullName, validLink } = require('../validators/validator');

const createCollege = async function (req, res) {
    try {
        const body = req.body;
        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: 'please enter all required fields to register a college' });
        const { name, fullName, logoLink } = body;
        if (!name) return res.status(400).send({ status: false, message: 'please enter name to register a college' });
        if (!fullName) return res.status(400).send({ status: false, message: 'please enter fullName to register a college' });
        if (!logoLink) return res.status(400).send({ status: false, message: 'please enter logoLink to register a college' });
        if (!validName(name)) return res.status(400).send({ status: false, message: 'please enter a valid inter name to register a college' });
        if (!validFullName(fullName)) return res.status(400).send({ status: false, message: 'please enter a valid fullName to register a college' });
        if (!validLink(logoLink)) return res.status(400).send({ status: false, message: 'please enter a valid logoLink to register a college' });

        // checking unique details -- 
        const college = await collegeModel.findOne({ name: name });
        if (college) return res.status(409).send({ status: false, message: 'college name is alredy in use, please enter a unique college name to register a college' });

        // registering college -- 
        const collegeCreated = await collegeModel.create(body);
        res.status(201).send({ status: true, message: 'college successfully registered', data: collegeCreated });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const getCollegeDetils = async function (req, res) {
    try {
        const filter = req.query;
        if (Object.keys(filter).length == 0) return res.status(400).send({ status: false, message: 'please select college name to get college details' });

        // finding college details -- 
        const collegeDetails = await collegeModel.findOne({ filter });
        if (!collegeDetails) return res.status(404).send({ status: false, message: 'college does not exists with given name' });

        // finding interns details in college - 
        let internsDetails = await internModel.find({ collegeId: collegeDetails._id });
        if (internsDetails.length == 0) {
            internsDetails = 'No interns applied in this college';
        };

        // response -- 
        const data = {};
        data.name = collegeDetails.name;
        data.fullName = collegeDetails.fullName;
        data.logoLink = collegeDetails.fullName;
        data.interns = internsDetails;
        res.status(200).send({ status: true, data: data });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

module.exports = { createCollege, getCollegeDetils };