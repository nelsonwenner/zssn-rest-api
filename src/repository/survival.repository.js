const survivalModel = require('../models/Survival');

const create = async (survivalData) => {
    const survival = new survivalModel(survivalData);
    return await survival.save();
}

module.exports = { create };