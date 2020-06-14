const Joi = require('joi');
const Account = require('../../../models/account');

// Local register
exports.localRegister = async (req, res) => {
    /* Verify data */
    const schema = Joi.object().keys({
        id: Joi.string().alphanum().min(4).max(15).required(),
        password: Joi.string().required().min(4).max(15),
        name: Joi.string().required()
    })
    const result = Joi.validate(req.body.user, schema);
    if (result.error) {
        res.status(400).json({ message: result.error.message });
        return;
    }

    /* Check duplicate */
    let existing = null;
    try {
        existing = await Account.findByID(req.body.user.id);
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }
    if (existing) {
        res.status(409).json({ message: 'duplicated userID' });
        return;
    }

    /* Create account */
    let account = null;
    try {
        account = await Account.localRegister(req.body.user);
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }

    /* Create token */
    let token = null;
    try {
        token = await account.generateToken();
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }
    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
    res.status(200).json({ user: account, access_token: token });
};

// Local login
exports.localLogin = async (req, res) => {
    /* Verify data */
    const schema = Joi.object().keys({
        id: Joi.string().required(),
        password: Joi.string().required()
    });
    const result = Joi.validate(req.body.user, schema);
    if (result.error) {
        res.status(400).json({ message: result.error.message });
        return;
    }

    /* Try login */
    const { id, password } = req.body.user;
    let account = null;
    try {
        account = await Account.findByID(id);
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }

    if (!account || !account.validatePassword(password)) {
        res.status(401).json({ message: "Invalid ID or PW" })
        return;
    }

    /* Create token */
    let token = null;
    try {
        token = await account.generateToken();
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }
    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
    res.status(200).json({ user: account, access_token: token });
};

// Logout
exports.logout = async (req, res) => {
    res.cookie('access_token', null, {
        httpOnly: true,
        maxAge: 0
    });
    res.status(204);
    res.end();
};

// Check token
exports.check = (req, res) => {
    const { user } = req;
    if (!user) {
        res.status(401).json({ message: "Forbidden" })
        return;
    }

    res.json({ user: user.name });
};

exports.changePassword = async (req, res) => {
    /* Check authority */
    const { user } = req;
    if (!user) {
        res.status(401).json({ message: "Forbidden" })
        return;
    }

    /* Verifiy data */
    const schema = Joi.object().keys({
        currentPassword: Joi.string().required(),
        changePassword: Joi.string().required()
    });
    const result = Joi.validate(req.body.user, schema);
    if (result.error) {
        res.status(400).json({ message: result.error.message });
        return;
    }
    let account = null;
    try {
        account = await Account.findOne({"_id": user._id});
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }
    const { currentPassword, changePassword } = req.body.user;
    if (!account || !account.validatePassword(currentPassword)) {
        res.status(401).json({ message: "Invalid PW" })
        return;
    }

    /* Change password */
    const change = await account.changePassword(changePassword);
    if (change.error) {
        res.status(500).json({ message: change.error });
        return;
    }
    res.cookie('access_token', null, {
        httpOnly: true,
        maxAge: 0
    });
    res.status(200).json({ message: 'Success' })
}

exports.withdrawal = async (req, res) => {
    /* Check authority */
    const { user } = req;
    if (!user) {
        res.status(401).json({ message: "Forbidden" })
        return;
    }
    /* Verifiy data */
    const schema = Joi.object().keys({
        password: Joi.string().required(),
    });
    const result = Joi.validate(req.body.user, schema);
    if (result.error) {
        res.status(400).json({ message: result.error.message });
        return;
    }
    let account = null;
    try {
        account = await Account.findOne({"_id": user._id});
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }
    const { password } = req.body.user;
    if (!account || !account.validatePassword(password)) {
        res.status(401).json({ message: "Invalid PW" })
        return;
    }

    const remove = await account.withdrawal();
    if (remove.error) {
        res.status(500).json({ message: remove.error });
        return;
    }
    res.status(200).json({ message: 'Success' })
}