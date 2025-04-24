const express = require('express');
const router = express.Router();
const { getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;