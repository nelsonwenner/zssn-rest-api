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
        
        const { senderId, ...senderInventory } = sender;
        const { targetId, ...targetInventory } = target;
        
        const senderSurvivor = await survivalRepository.getInstance(senderId);
        const targetSurvivor = await survivalRepository.getInstance(targetId);

        if (senderSurvivor.isInfected || 
            targetSurvivor.isInfected ) {
            throw new Error(ERROR_SURVIVAL_INFECTED);
        }

        if (senderId == targetId) {
            throw new Error(ERROR_IDS_EQUALS);
        }

        if (!verifyParams(senderInventory, INVENTORY_ATTRIBUTES) ||
            !verifyParams(targetInventory, INVENTORY_ATTRIBUTES)){
            throw new Error(ERROR_ATTRIBUTS_INVALID);
        } 
        
        const inventorySender = senderSurvivor.dataValues.inventory.dataValues;
        const inventoryTarget = targetSurvivor.dataValues.inventory.dataValues;

        let payload =  {
            sender: {
                instance: senderSurvivor,
                qntPointsBodyResquest: getPoints(senderInventory)
            },
            target: {
                instance: targetSurvivor,
                qntPointsBodyResquest: getPoints(targetInventory)
            }, 
            keysDataBody: Object.keys(senderInventory)
        }

        if (verifyValuesInventory(senderInventory, inventorySender) &&
            verifyValuesInventory(targetInventory, inventoryTarget)) {
                
            if (payload.sender.qntPointsBodyResquest ==
                payload.target.qntPointsBodyResquest) {
                
                request.body = payload;

                next();
                
                return response.status(200).json({result: "Qnt de itens iguais"});
                
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

module.exports = { validatorTrade };