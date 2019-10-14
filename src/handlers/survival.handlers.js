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

        inventoryModel.set('points', inventoryRepository.calcPoints(inventoryModel.dataValues));

        await survivalModel.save();
        await inventoryModel.save();

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

const trade = async (request, response) => {

    try {

        const { sender, target } = request.body;

        sender.keysItens.forEach(key => {
            sender.inventory[key] -= sender.requestInventory[key];
            target.inventory[key] += sender.requestInventory[key];
        });

        target.keysItens.forEach(key => {
            target.inventory[key] -= target.requestInventory[key];
            sender.inventory[key] += target.requestInventory[key];
        });

        sender.inventory.points = inventoryRepository.calcPoints(sender.inventory.dataValues);
        target.inventory.points = inventoryRepository.calcPoints(target.inventory.dataValues);

        await sender.inventory.save();
        await target.inventory.save();

        return response.status(200).json({sender: sender.inventory, targer: target.inventory});

    } catch (error) {
        switch (error.message) {
            case error.message:
                return response.status(401).json({error: error.message });
        }
    }
}

const report = async (request, response) => {

    try {

        const items = await survivalRepository.sumAllItems();
        const survivorAll = await survivalRepository.listAll();
        const isInfecteds = await survivalRepository.infectedOrNotInfected(true);
        const notInfecteds = await survivalRepository.infectedOrNotInfected(false);
        const amountLost = await survivalRepository.amountPointsInfected();

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

module.exports = { create, listAll, updateLocation, flag, trade, report };

