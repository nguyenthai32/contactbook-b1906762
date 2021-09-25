const mogoose = require("mongoose");
const createContactModel = require("./contact.model");

const db = {};
db.mogoose = mogoose;
db.Contact = createContactModel(mogoose);

module.exports = db;
