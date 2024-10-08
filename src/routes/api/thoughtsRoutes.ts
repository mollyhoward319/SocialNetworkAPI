import {Router} from 'express';
const router= Router();
import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} from '../../controllers/thoughtsControllers.js';
router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtsId').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:thoughtsId/reaction').post(addReaction).delete(removeReaction);

export { router as thoughtsRouter};