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
    favorites: [JSON],
    create_date: { type: Date, default: Date.now },
});

Account.statics.findByID = function(id) {
    return this.findOne({'id': id}).exec();
}

Account.statics.localRegister = function({ id, password, name }) {
    const account = new this({
        id: id,
        password: hash(password),
        name: name,
        favorites: [
            {
                name: "Airpod",
                selected: false,
            },
            {
                name: "iMac",
                selected: false,
            },
            {
                name: "iPad",
                selected: false,
            },
            {
                name: "iPhone",
                selected: false,
            },
            {
                name: "Macbook",
                selected: false,
            },
            {
                name: "MacPro",
                selected: false,
            },
            {
                name: "Watch",
                selected: false,
            },
        ]
    });

    return account.save();
}

Account.methods.changePassword = async function(password) {
    this.password = hash(password);
    return this.save();
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

Account.methods.withdrawal = function() {
    return this.remove();
}

Account.methods.updateFavorite = function(name, favorite) {
    account.favorites.name = favorite;
    return this.save();
}

Account.methods.getFavorites = function() {
    return this.favorites;
}

Account.methods.setFavorites = function(items) {
    this.favorites = items;
    return this.save();
}

module.exports = mongoose.model('Account', Account);