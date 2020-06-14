const Account = require('../../../models/account');

// Get favorite item list
exports.getItems = async (req, res) => {
    /* Check authority */
    const { user } = req;
    if (!user) {
        res.status(401).json({ message: 'Forbidden' })
        return;
    }
    let account = null;
    try {
        account = await Account.findOne({"_id": user._id});
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }

    const favorites = account.getFavorites();
    res.status(200).json({ favorites })
}

// Set favorite item list
exports.setItems = async (req, res) => {
    /* Check authority */
    const { user } = req;
    if (!user) {
        res.status(401).json({ message: Forbidden })
        return;
    }
    let account = null;
    try {
        account = await Account.findOne({"_id": user._id});
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }

    const result = await account.setFavorites(req.body.favorites);
    if (result.error) {
        res.status(500).json({ message: result.error.message });
        return;
    }
    res.status(200).json({ favorites: req.body.favorites })
}