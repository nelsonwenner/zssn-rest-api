const { calcPoints, verifyValuesInventory } = require('../repository/inventory.repository');
const survivalRepository = require('../repository/survival.repository');
const { verifyParams } = require('../validator/inventory.validator');
const { INVENTORY_ATTRIBUTES } = require('../utils/attributes');

const { 
    ERROR_SURVIVAL_INFECTED,
    ERROR_QUANTITY_ITENS_INVENTORY_INVALID,
    ERROR_AMOUNT_POINTS_NOT_EQUALS,
    ERROR_ATTRIBUTS_INVALID,
    ERROR_SURVIVORS_NOT_EXISTS,
    ERROR_IDS_EQUALS
} = require('../utils/errorTypes');

const validatorTrade = async (request, response, next) => {

    try {
        
        const { sender, target } = request.body;
        
        const { senderId, ...senderRequestInventory } = sender;
        const { targetId, ...targetRequestInventory } = target;
        
        const senderSurvivor = await survivalRepository.getInstance(senderId);
        const targetSurvivor = await survivalRepository.getInstance(targetId);

        if (senderSurvivor == null || targetSurvivor == null) {
            throw new Error(ERROR_SURVIVORS_NOT_EXISTS);
        }

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
                qntPointsBodyResquest: calcPoints(senderRequestInventory),
            },
            target: {
                requestInventory: targetRequestInventory,
                inventory: inventoryTarget,
                keysItens: keys(targetRequestInventory),
                qntPointsBodyResquest: calcPoints(targetRequestInventory)
            }, 
        }
        
        if (verifyValuesInventory(senderRequestInventory, inventorySender) && 
            verifyValuesInventory(targetRequestInventory, inventoryTarget)) {

            if (payload.sender.qntPointsBodyResquest ==
                payload.target.qntPointsBodyResquest) {
                
                request.body = payload;

                next();
                
            } else {
                throw new Error(ERROR_AMOUNT_POINTS_NOT_EQUALS);
            }

        } else {
            throw new Error(ERROR_QUANTITY_ITENS_INVENTORY_INVALID);
        }
    
    } catch (error) {
        switch (error.message) {
            case ERROR_SURVIVAL_INFECTED:
                return response.status(400).json({error: ERROR_SURVIVAL_INFECTED});
            case ERROR_QUANTITY_ITENS_INVENTORY_INVALID:
                return response.status(400).json({error: ERROR_QUANTITY_ITENS_INVENTORY_INVALID});
            case ERROR_AMOUNT_POINTS_NOT_EQUALS:
                return response.status(400).json({error: ERROR_AMOUNT_POINTS_NOT_EQUALS});
            case ERROR_ATTRIBUTS_INVALID:
                return response.status(400).json({error: ERROR_ATTRIBUTS_INVALID});
            case ERROR_SURVIVORS_NOT_EXISTS:
                return response.status(404).json({error: ERROR_SURVIVORS_NOT_EXISTS});
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