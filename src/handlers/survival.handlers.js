const survivalRepository = require('../repository/survival.repository');
const inventoryRepository = require('../repository/inventory.repository');
const locationRepository = require('../repository/location.repository');
const modelInventory = require('../models/Inventory');
const modelSurvival = require('../models/Survival');

const create = async (request, response) => {
    
    try {
        
        const { name, age, sex, lastLocation, inventory } = request.body;

        const locationModel = await locationRepository.create(lastLocation);
        const inventoryModel = await inventoryRepository.create(inventory);

        const survival = {"name": name, "age": age, "sex": sex}
        const survivalModel = await survivalRepository.create(survival);

        survivalModel.set('inventoryId', inventoryModel.inventoryId);
        survivalModel.set('locationId', locationModel.locationId);

        await survivalModel.save();

        return response.status(201).json({survivalModel, inventoryModel, locationModel});

    } catch (error) {
        switch (error.message) {
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

const updateLocation = async (request, response) => {

    try {
        
        const { survivalId, latitude, longitude } = request.body;

        const lastLocation = {"latitude": latitude, "longitude": longitude}

        const updated = await locationRepository.update(survivalId, lastLocation);
        
        return response.status(200).json({updated});
        
    } catch (error) {
        switch (error.message) {
            case error.message:
                console.log(error.message);
                return response.status(401).json({error: error.message });
        }
    }
}

const listAll = async (request, response) => {

    try {

        const data = await survivalRepository.listAll();
        return response.status(200).json(data);

    } catch (error) {
        switch (error.message) {
            case error.message:
                console.log(error.message);
                return response.status(401).json({error: error.message });
        }
    }
}

const trade = async (request, response) => {

    try {

       
    } catch (error) {
        switch (error.message) {
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

const tests = async (request, response) => {

    try {

        const { id } = request.body;
        
        const data = await modelInventory.findOne({where: {inventoryId: id}}).then((result) => {
            return result.destroy();
        });

        return response.status(200).json(data);

    } catch (error) {
        switch (error.message) {
            case error.message:
                console.log(error.message);
                return response.status(401).json({error: error.message });
        }
    }
}

module.exports = { create, listAll, updateLocation, trade, tests };