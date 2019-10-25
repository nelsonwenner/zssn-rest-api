const survivorRepository = require('../repository/survivor.repository');
const inventoryRepository = require('../repository/inventory.repository');
const locationRepository = require('../repository/location.repository');

const create = async (request, response) => {
    
    try {
        
        const { lastLocation, inventory, ...survivor } = request.body;

        const locationModel = await locationRepository.create(lastLocation);
        const inventoryModel = await inventoryRepository.create(inventory);
        const survivorModel = await survivorRepository.create(survivor);
        
        survivorModel.set('inventoryId', inventoryModel.inventoryId);
        survivorModel.set('locationId', locationModel.locationId);
        
        inventoryModel.set('points', inventoryRepository.calcPoints(inventoryModel.dataValues));

        await survivorModel.save();
        await inventoryModel.save();

        return response.status(201).json({survivorModel, inventoryModel, locationModel});

    } catch (error) {
        switch (error.message) {
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

const listAll = async (request, response) => {

    try {

        const data = await survivorRepository.listAll();
        return response.status(200).json(data);

    } catch (error) {
        switch (error.message) {
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

const flag = async (request, response) => {

    try {

        const { target } = request.body;
    
        if (target.flags < 3) {
            target.flags++;
            
            await target.save();
          
            if (target.flags == 3) {
                target.isInfected = true;

                await target.save();
            }
        }

        return response.status(200).json({error: target });

    } catch (error) {
        switch (error.message) {
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

const report = async (request, response) => {

    try {

        const items = await survivorRepository.sumAllItems();
        const survivorAll = await survivorRepository.listAll();
        const isInfecteds = await survivorRepository.infectedOrNotInfected(true);
        const notInfecteds = await survivorRepository.infectedOrNotInfected(false);
        const amountLost = await survivorRepository.amountPointsInfected();

        const payload = [
            {
                description: "Percentage of infected survivors", 
                percentage: {
                    values: ((100 / survivorAll.length ) * isInfecteds)
                }
            },
            {
                description: "Percentage of not infected survivors",
                percentage: {
                    values: ((100 / survivorAll.length ) * notInfecteds)
                }
            },
            {
                description: "Average amount of each resource type per survivor",
                water: {
                    average: {
                        values: (items.water / notInfecteds)
                    }
                },
                food: {
                    average: {
                        values: (items.food / notInfecteds)
                    }
                },
                medication: {
                    average: {
                        values: (items.medication / notInfecteds)
                    }
                },
                ammunition: {
                    average: {
                        values: (items.ammunition / notInfecteds)
                    }
                }
            },
            {
                description: "Points lost because of infected survivor.",
                points: {
                    values: amountLost
                }
            }
        ]
        
        return response.status(200).json(payload);

    } catch (error) {
        switch (error.message) {
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

module.exports = { create, listAll, flag, report };

