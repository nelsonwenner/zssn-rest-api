const survivalRepository = require('../repository/survival.repository');
const { getPoints, verifyValuesInventory } = require('../repository/inventory.repository');
const { verifyParams } = require('../validator/inventory.validator');
const { INVENTORY_ATTRIBUTES } = require('../utils/attributes');

const { 
    ERROR_SURVIVAL_INFECTED,
    ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S1,
    ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S2,
    ERROR_ATTRIBUTS_INVALID
} = require('../utils/errorTypes');

const validatorTrade = async (request, response, next) => {

    try {
        
        const dataBody = request.body;
        
        if (!verifyParams(dataBody, INVENTORY_ATTRIBUTES)){
            throw new Error(ERROR_ATTRIBUTS_INVALID);
        } 
        
        const { survival01_id, survival02_id } = request.params;
            
        const survival01 = await survivalRepository.getInstance(survival01_id);
        const survival02 = await survivalRepository.getInstance(survival02_id);

        if (survival01.isInfected != true && survival02.isInfected != true) {
            
            let payload =  {
                "survival01": [{
                    "intance": survival01,
                    "qntPointsBodyResquest": getPoints(dataBody)
                }],
                "survival02": [{
                    "intance": survival02,
                    "qntPoints": getPoints(survival02.dataValues.Inventory.dataValues)
                }], 
                "keysDataBody": Object.keys(dataBody),   
            }

            if (verifyValuesInventory(dataBody, survival01.dataValues.Inventory.dataValues)) {
       
                if (payload.survival02[0].qntPoints >= payload.survival01[0].qntPointsBodyResquest) {
                    
                    request.body = payload;

                    next();

                } else {
                    throw new Error(ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S2);
                }

            } else {
                throw new Error(ERROR_QUANTITY_ITENS_INVENTORY_INVALID_S1);
            }

        } else {
            throw new Error(ERROR_SURVIVAL_INFECTED);
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
            case error.message:
                return response.status(401).json({error: error.message }); // Remover quando finalizar o projeto
        }
    }
}

module.exports = { validatorTrade };