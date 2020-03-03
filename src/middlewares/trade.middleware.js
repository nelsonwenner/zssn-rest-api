import inventoryRepository from '../repositories/inventory.repository';
import survivorRepository from '../repositories/survivor.repository';
import notice from '../utils/error.types';


class TradeMiddleware {

    async trade(req, res, next) {

        try {
            
            const { sender_id, target_id } = req.params;
            const { sender, target } = req.body;

            if (sender_id === target_id) {
                throw new Error(notice.ERROR_SURVIVOR_EQUALS);
            }
            
            const senderSurvivor = await survivorRepository.get(sender_id);
            const targetSurvivor = await survivorRepository.get(target_id);

            if (!sender || !target) {
                throw new Error(notice.ERROR_SURVIVOR_DOES_NOT_EXIST);
            }

            if (sender.infected || target.infected) {
                throw new Error(notice.ERROR_SURVIVOR_IS_INFECTED);
            }

            if ((inventoryRepository.verifyInventoryValues(sender, senderSurvivor.inventory.resources)) || 
                (inventoryRepository.verifyInventoryValues(target, targetSurvivor.inventory.resources))) {
                throw new Error(notice.ERROR_INVENTORY_INVALID);
            }

            const payload = {
                sender: {
                    survivor: senderSurvivor,
                    reqInventory: sender,
                    points: inventoryRepository.calcPoints(sender, 
                    senderSurvivor.inventory.resources)
                },
                target: {
                    survivor: targetSurvivor,
                    reqInventory: target,
                    points: inventoryRepository.calcPoints(target, 
                    targetSurvivor.inventory.resources)
                }
            }
            
            if ((payload.sender.points != payload.target.points)) {
                throw new Error(notice.ERROR_POINS_INCOMPATIBLE);
            }

            req.body = payload;

            next();

        } catch (error) {
            switch (error.message) {
                case notice.ERROR_SURVIVOR_DOES_NOT_EXIST:
                    return res.status(404).json({error: notice.ERROR_SURVIVOR_DOES_NOT_EXIST});
                case notice.ERROR_SURVIVOR_IS_INFECTED:
                    return res.status(400).json({error: notice.ERROR_SURVIVOR_IS_INFECTED});
                case notice.ERROR_POINS_INCOMPATIBLE:
                    return res.status(400).json({error: notice.ERROR_POINS_INCOMPATIBLE});
                case notice.ERROR_INVENTORY_INVALID:
                    return res.status(400).json({error: notice.ERROR_INVENTORY_INVALID});
                case notice.ERROR_SURVIVOR_EQUALS:
                    return res.status(400).json({error: notice.ERROR_SURVIVOR_EQUALS});
                default:
                    return res.json({error: error.message });
            }
        }
    }
}

export default new TradeMiddleware();