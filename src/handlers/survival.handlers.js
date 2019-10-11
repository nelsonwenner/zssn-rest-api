const survivalRepository = require('../repository/survival.repository');
const inventoryRepository = require('../repository/inventory.repository');
const locationRepository = require('../repository/location.repository');

const create = async (request, response) => {
    
    try {
        
        const { lastLocation, inventory, ...survival } = request.body;

        const locationModel = await locationRepository.create(lastLocation);
        const inventoryModel = await inventoryRepository.create(inventory);
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
        
        const { survivalId, ...locations } = request.body;
        
        const updated = await locationRepository.update(survivalId, locations);
        
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

const report = async (request, response) => {

    try {

        const { sender, target } = request.body;

        console.log("\n\nTESTS: ", request.body);
        


    } catch (error) {
        switch (error.message) {
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

module.exports = { create, listAll, updateLocation, report };

