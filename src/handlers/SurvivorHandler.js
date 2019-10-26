const survivorRepository = require('../repository/SurvivorRepository');
const inventoryRepository = require('../repository/InventoryRepository');
const locationRepository = require('../repository/LocationRepository');

class SurvivorHandler {

    async store(request, response) {
      
        try {
            
            const { location, inventory, ...survivor } = request.body;

            const locationModel = await locationRepository.create(location);
            const inventoryModel = await inventoryRepository.create(inventory);
            const survivorModel = await survivorRepository.create(survivor);
                
            survivorModel.set('inventory_id', inventoryModel.inventory_id);
            survivorModel.set('location_id', locationModel.location_id);
            
            inventoryModel.set('points', inventoryRepository.calcPoints(inventoryModel.dataValues));

            Promise.all([
                survivorModel.save(),
                inventoryModel.save()
            ]);

            return response.status(201).json({survivorModel, inventoryModel, locationModel});

        } catch (error) {
            switch (error.message) {
                case error.message:
                    return response.status(401).json({error: error.message });
            }
        }
    }

    async listAll(request, response) {

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

    async flag (request, response) {

        try {

            const { target } = request.body;
        
            if (target.flags_infected < 3) {
                target.flags_infected++;
            
                if (target.flags_infected == 3) {
                    target.infected = true;

                    await target.save();
                }
                
                await target.save();
            }

            return response.status(200).json({error: target });

        } catch (error) {
            switch (error.message) {
                case error.message:
                    return response.status(401).json({error: error.message });
            }
        }
    }

    async report(request, response) {

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
}

module.exports = new SurvivorHandler();

