const Survivor = require('../models/Survivor');
const Inventory = require('../models/Inventory');
const Location = require('../models/Location');

class SurvivorRepository {

    async create(survivorData) {
        const survivor = new Survivor(survivorData);
        return await survivor.save();
    }

    async listAll() {
        const attributesLocation = ['latitude', 'longitude']
        const attributesSurvivor = ['survivor_id', 'infected', 'name', 'age', 'sex']
        const attributesInventory = ['water', 'food', 'medication', 'ammunition', 'points']
        return await Survivor.findAll({attributes: attributesSurvivor ,include: [
        {as: 'inventory', model: Inventory, attributes: attributesInventory}, 
        {as: 'last_location', model: Location, attributes: attributesLocation}]});
    }

    async getInstance(id) {
        const attributesInventory = ['inventory_id', 'water', 'food', 'medication', 'ammunition']
        return await Survivor.findOne({where: {survivor_id: id}, include: 
        [{as: 'inventory', model: Inventory, attributes: attributesInventory}]});
    }

    async infectedOrNotInfected(isInfected) {
        return await Survivor.count({where: {infected: isInfected }});
    }

    async sumAllItems() {
        const data = {'water': 0.0, 'food': 0.0, 'medication': 0.0, 'ammunition': 0.0};
        const inventorys = await Survivor.findAll({where: {infected: false}, 
        include: [{as: 'inventory', model: Inventory}]});
        
        inventorys.forEach(({ inventory }) => {
            data['water'] += inventory.water;
            data['food'] += inventory.food;
            data['medication'] += inventory.medication;
            data['ammunition'] += inventory.ammunition;
        });
        return data;
    }

    async amountPointsInfected() {
        return await Survivor.sum('points', {where: {infected: true}, 
        include: [{as: 'inventory', model: Inventory}]});
    }

}

module.exports = new SurvivorRepository();
