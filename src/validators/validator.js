const validName = (name) => /^[a-zA-Z ]{3,20}$/.test(name);
const validCollege = (name) => /^[a-zA-Z ]{3,20}$/.test(name);
const validEmail = (mail) => /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail);
const validNumber = (number) => (/^[6-9]{1}?[0-9]{9}$/).test(number);
const validFullName = (name) => (/^[a-zA-Z0-9_. ]{3, 50}$/).test(name);

const validUrl = require("valid-url")
const isUrl = validUrl.isUrl;

module.exports = {validName, validEmail, validCollege, validNumber, validFullName, isUrl};