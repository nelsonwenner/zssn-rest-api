import inventoryRespository from '../repository/InventoryRepository';
import survivorRepository from '../repository/SurvivorRepository';
import attributes from '../utils/attributes';
import notice from '../utils/errorTypes';

class TradeMiddleware {

    async validatorTrade (request, response, next) {
        
        try {
            
            const { sender, target } = request.body;
            
            const { sender_id, ...senderRequestInventory } = sender;
            const { target_id, ...targetRequestInventory } = target;
            
            const senderSurvivor = await survivorRepository.getInstance(sender_id);
            const targetSurvivor = await survivorRepository.getInstance(target_id);
            
            if (senderSurvivor == null || targetSurvivor == null) {
                throw new Error(notice.ERROR_SURVIVORS_NOT_EXISTS);
            }
     
            if (senderSurvivor.infected || 
                targetSurvivor.infected ) {
                throw new Error(notice.ERROR_SURVIVOR_INFECTED);
            }
           
            if (sender_id == target_id) {
                throw new Error(notice.ERROR_IDS_EQUALS);
            }
            
            if (!verifyParams(senderRequestInventory, attributes.INVENTORY_ATTRIBUTES) ||
                !verifyParams(targetRequestInventory, attributes.INVENTORY_ATTRIBUTES)){
                throw new Error(notice.ERROR_ATTRIBUTS_INVALID);
            } 
            
            const inventorySender = senderSurvivor.dataValues.inventory;
            const inventoryTarget = targetSurvivor.dataValues.inventory;
            
            let payload = {
                sender: {
                    requestInventory: senderRequestInventory,
                    inventory: inventorySender,
                    keysItens: keys(senderRequestInventory),
                    qntPointsBodyResquest: inventoryRespository.calcPoints(senderRequestInventory),
                },
                target: {
                    requestInventory: targetRequestInventory,
                    inventory: inventoryTarget,
                    keysItens: keys(targetRequestInventory),
                    qntPointsBodyResquest: inventoryRespository.calcPoints(targetRequestInventory)
                }, 
            }
            
            if (inventoryRespository.verifyValuesInventory(senderRequestInventory, inventorySender) && 
                inventoryRespository.verifyValuesInventory(targetRequestInventory, inventoryTarget)) {
    
                if (payload.sender.qntPointsBodyResquest ==
                    payload.target.qntPointsBodyResquest) {
                    
                    request.body = payload;
    
                    next();
                    
                } else {
                    throw new Error(notice.ERROR_AMOUNT_POINTS_NOT_EQUALS);
                }
    
            } else {
                throw new Error(notice.ERROR_QUANTITY_ITENS_INVENTORY_INVALID);
            }
        
        } catch (error) {
            switch (error.message) {
                case notice.ERROR_SURVIVOR_INFECTED:
                    return response.status(400).json({error: notice.ERROR_SURVIVOR_INFECTED});
                case notice.ERROR_QUANTITY_ITENS_INVENTORY_INVALID:
                    return response.status(400).json({error: notice.ERROR_QUANTITY_ITENS_INVENTORY_INVALID});
                case notice.ERROR_AMOUNT_POINTS_NOT_EQUALS:
                    return response.status(400).json({error: notice.ERROR_AMOUNT_POINTS_NOT_EQUALS});
                case notice.ERROR_ATTRIBUTS_INVALID:
                    return response.status(400).json({error: notice.ERROR_ATTRIBUTS_INVALID});
                case notice.ERROR_SURVIVORS_NOT_EXISTS:
                    return response.status(404).json({error: notice.ERROR_SURVIVORS_NOT_EXISTS});
                case notice.ERROR_IDS_EQUALS:
                    return response.status(400).json({error: notice.ERROR_IDS_EQUALS});
                case error.message:
                    return response.status(401).json({error: error.message }); // Remover quando finalizar o projeto
            }
        }
    }
}

const verifyParams = (payload, keysAuthorized) => {
    const countkeys = Object.keys(keysAuthorized ).length;
    const keysParams = Object.keys(payload);
    let verify = [];
    keysParams.forEach((key) => {
        if (key == keysAuthorized[key]) verify.push(true);
    });
    if (verify.length == countkeys) return true;
    return false;
}

const keys = (json) => {
    let newKey = [];
    Object.keys(json).forEach((k) => {
        if (json[k] != 0) newKey.push(k);
    });
    return newKey;
}

export default new TradeMiddleware();