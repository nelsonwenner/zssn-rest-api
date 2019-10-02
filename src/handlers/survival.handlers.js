const survivalRepository = require('../repository/survival.repository');
const inventoryRepository = require('../repository/inventory.repository');

const create = async (request, response) => {
    
    try {
        
        const survivalData = request.body;

        const inventory = await inventoryRepository.create();
        const survival = await survivalRepository.create(survivalData);

        survival.id = inventory.id;

        await survival.save();

        return response.status(201).json({survival, inventory});

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

module.exports = { create, listAll };