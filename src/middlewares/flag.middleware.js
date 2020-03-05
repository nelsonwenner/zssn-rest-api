import survivorRepository from '../repositories/survivor.repository';
import flagRepository from '../repositories/flag.repository';
import notice from '../utils/error.types';


class FlagMiddleware {

    async flag(req, res, next) {

        try {
            
            const { sender_id, target_id } = req.params;

            if (sender_id === target_id) {
                throw new Error(notice.ERROR_SURVIVOR_EQUALS);
            }
            
            const sender = await survivorRepository.get(sender_id);
            const target = await survivorRepository.get(target_id);
            
            if (!sender || !target) {
                throw new Error(notice.ERROR_SURVIVOR_DOES_NOT_EXIST);
            }

            if (sender.infected || target.infected) {
                throw new Error(notice.ERROR_SURVIVOR_IS_INFECTED);
            }

            if (!!await flagRepository.existFlag(sender_id, target_id)) {
                throw new Error(notice.ERROR_SURVIVOR_FLAGGED);
            }

            next();

        } catch (error) {
            switch (error.message) {
                case notice.ERROR_SURVIVOR_DOES_NOT_EXIST:
                    return res.status(404).json({error: notice.ERROR_SURVIVOR_DOES_NOT_EXIST});
                case notice.ERROR_SURVIVOR_IS_INFECTED:
                    return res.status(400).json({error: notice.ERROR_SURVIVOR_IS_INFECTED});
                case notice.ERROR_SURVIVOR_FLAGGED:
                    return res.status(400).json({error: notice.ERROR_SURVIVOR_FLAGGED});
                case notice.ERROR_SURVIVOR_EQUALS:
                    return res.status(400).json({error: notice.ERROR_SURVIVOR_EQUALS});
                default:
                    return res.json({error: error.message });
            }
        }
    }
}

export default new FlagMiddleware();