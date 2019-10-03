const survivalRepository = require('../repository/survival.repository');
const inventoryRepository = require('../repository/inventory.repository');

const create = async (request, response) => {
    
    try {
        
        const { name, age, sex, latitude, longitude, inventory } = request.body;
        
        const inventoryModel = await inventoryRepository.create(inventory);
        const survivalModel = await survivalRepository.create(
        {"name": name, "age": age, "sex": sex, "latitude": latitude, "longitude": longitude});

        survivalModel.inventory_id = inventoryModel.inventory_id;

        await survivalModel.save();

        return response.status(201).json({survivalModel, inventoryModel});

    } catch (error) {
        switch (error.message) {
            case error.message:
                console.log(error.message);
                return response.status(401).json({error: error.message });
        }
    }
}

const updateLocation = async (request, response) => {

    try {
        
        const { id } = request.params;
        const data = request.body;

        const updated = await survivalRepository.update(id, data, true);

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

        const data = request.body;
        console.log("\n\nTESTS: ", data); // Continuar
        
    } catch (error) {
        switch (error.message) {
            case error.message:
                console.log(error.message);
                return response.status(401).json({error: error.message });
        }
    }
}

module.exports = { create, listAll, updateLocation, trade };