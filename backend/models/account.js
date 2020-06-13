const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const { generateToken } = require('../routes/lib/token');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    name: String,
    id: String,
    password: String,
    create_date: { type: Date, default: Date.now }
});

Account.statics.findByID = function(id) {
    return this.findOne({'id': id}).exec();
}

Account.statics.localRegister = function({ id, password, name }) {
    const account = new this({
        id: id,
        password: hash(password),
        name: name
    });

    return account.save();
}

Account.methods.validatePassword = function(password) {
    const hashed = hash(password);
    return this.password === hashed;
}

Account.methods.generateToken = function() {
    const payload = {
        _id: this._id,
        name: this.name
    }
    return generateToken(payload, 'account');
}

module.exports = mongoose.model('Account', Account);