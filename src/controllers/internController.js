const internModel = require('../models/internModel');
const collegeModel = require('../models/collegeModel');
const { validName, validEmail, validCollege, validNumber } = require('../validators/validator');

const createIntern = async function (req, res) {
    try {
        const body = req.body;
        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: 'please enter all required fields to register an intern' });
        const { name, email, collegeName, mobile } = body;
        if (!name) return res.status(400).send({ status: false, message: 'please enter name to register an intern' });
        if (!email) return res.status(400).send({ status: false, message: 'please enter email to register an intern' });
        if (!collegeName) return res.status(400).send({ status: false, message: 'please enter collegeName to register an intern' });
        if (!mobile) return res.status(400).send({ status: false, message: 'please enter mobile to register an intern' });
        if (!validName(name)) return res.status(400).send({ status: false, message: 'please enter a valid inter name to register an intern' });
        if (!validEmail(email)) return res.status(400).send({ status: false, message: 'please enter a valid email to register an intern' });
        if (!validCollege(collegeName)) return res.status(400).send({ status: false, message: 'please enter a valid college name to register an intern' });
        if (!validNumber(mobile)) return res.status(400).send({ status: false, message: 'please enter a valid mobile number to register an intern' });

        // checking unique detials -- 
        const intern = await internModel.findOne({ $or: [{ email: email }, { mobile: mobile }] });
        if (intern) {
            if (email == intern.email) return res.status(409).send({ status: false, message: 'email is already in use, please enter a unique email to register an intern' });
            if (mobile == intern.mobile) return res.status(409).send({ status: false, message: 'mobile is already in use, please enter a unique mobile number to registare an intern' });
        };

        // checking college details --
        const college = await collegeModel.findOne({ name: collegeName });
        if (!college) return res.status(404).send({ status: false, message: 'college does not exists with this name' });

        // updating data -- 
        delete body.collegeName;
        body[collegeId] = college._id;

        // creating intern -- 
        const internCreated = await internModel.create(body);
        res.status(201).send({ status: true, message: 'intern successfully registered', data: internCreated });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

module.exports = { createIntern };