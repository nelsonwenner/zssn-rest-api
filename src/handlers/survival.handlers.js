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

        console.log("entrou");
        const itensPoints = ["water", "food", "medication", "ammunition"];

        const { survival01, survival02 } = request.body;

        let qntPointsBodyResquest = survival01[0].qntPointsBodyResquest;
        let inventary02 = survival02[0].instance.dataValues.Inventory.dataValues;
        
        let status = true;
        let values = 0;
        
        while (status) {

            let key = itensPoints[randomForInterval(0, 3)];
            let qntItem = inventary02[key];
            
            if (values == qntPointsBodyResquest) status = false;

            else if (key == 'water' && qntItem != 0) {
                // remover 1 item 
                values += 4;
            }

            else if (key == 'food' && qntItem != 0) {
                // remover 1 item 
                values += 3;
            }

            else if (key == 'medication' && qntItem != 0) {
                // remover 1 item 
                values += 2;
            }

            else if (key == 'ammunition' && qntItem != 0) {
                // remover 1 item 
                values += 1;
            }
        
        }

        //console.log(`\nKey: ${key}\nValor: ${qntItem}`);
        console.log(`\nqntPointsBodyResquest: ${qntPointsBodyResquest}\nqntPointSurvival2: ${values}`);
        

        //console.log("\n\nTESTS: ", survival02[0].instance.dataValues.Inventory.dataValues); 
        
    } catch (error) {
        switch (error.message) {
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

randomForInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = { create, listAll, updateLocation, trade };