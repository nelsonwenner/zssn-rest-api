const { getPoints, verifyValuesInventory } = require('../repository/inventory.repository');
const survivalRepository = require('../repository/survival.repository');
const { verifyParams } = require('../validator/inventory.validator');
const { INVENTORY_ATTRIBUTES } = require('../utils/attributes');

const { 
    ERROR_SURVIVAL_INFECTED,
    ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S1,
    ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S2,
    ERROR_ATTRIBUTS_INVALID,
    ERROR_IDS_EQUALS
} = require('../utils/errorTypes');

const validatorTrade = async (request, response, next) => {

    try {
        
        const { sender, target } = request.body;
        
        const { senderId, ...senderRequestInventory } = sender;
        const { targetId, ...targetRequestInventory } = target;
        
        const senderSurvivor = await survivalRepository.getInstance(senderId);
        const targetSurvivor = await survivalRepository.getInstance(targetId);

        if (senderSurvivor.isInfected || 
            targetSurvivor.isInfected ) {
            throw new Error(ERROR_SURVIVAL_INFECTED);
        }

        if (senderId == targetId) {
            throw new Error(ERROR_IDS_EQUALS);
        }

        if (!verifyParams(senderRequestInventory, INVENTORY_ATTRIBUTES) ||
            !verifyParams(targetRequestInventory, INVENTORY_ATTRIBUTES)){
            throw new Error(ERROR_ATTRIBUTS_INVALID);
        } 
        
        const inventorySender = senderSurvivor.dataValues.inventory;
        const inventoryTarget = targetSurvivor.dataValues.inventory;

        let payload = {
            sender: {
                requestInventory: senderRequestInventory,
                inventory: inventorySender,
                keysItens: keys(senderRequestInventory),
                qntPointsBodyResquest: getPoints(senderRequestInventory),
            },
            target: {
                requestInventory: targetRequestInventory,
                inventory: inventoryTarget,
                keysItens: keys(targetRequestInventory),
                qntPointsBodyResquest: getPoints(targetRequestInventory)
            }, 
        }

        if (verifyValuesInventory(senderRequestInventory, inventorySender.dataValues) && 
            verifyValuesInventory(targetRequestInventory, inventoryTarget.dataValues)) {
                
            if (payload.sender.qntPointsBodyResquest ==
                payload.target.qntPointsBodyResquest) {
                
                request.body = payload;

                next();
                
            } else {
                throw new Error(ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S2);
            }

        } else {
            throw new Error(ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S1);
        }
    
    } catch (error) {
        switch (error.message) {
            case ERROR_SURVIVAL_INFECTED:
                return response.status(400).json({error: ERROR_SURVIVAL_INFECTED});
            case ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S1:
                return response.status(400).json({error: ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S1});
            case ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S2:
                return response.status(400).json({error: ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S2});
            case ERROR_ATTRIBUTS_INVALID:
                return response.status(400).json({error: ERROR_ATTRIBUTS_INVALID});
            case ERROR_IDS_EQUALS:
                return response.status(400).json({error: ERROR_IDS_EQUALS});
            case error.message:
                return response.status(401).json({error: error.message }); // Remover quando finalizar o projeto
        }
    }
}

const keys = (json) => {
    let newKey = [];
    Object.keys(json).forEach((k) => {
        if (json[k] != 0) newKey.push(k);
    });
    return newKey;
}

module.exports = { validatorTrade };