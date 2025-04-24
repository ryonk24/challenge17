const express = require('express');
const router = express.Router();
const { getThoughts, getThoughtById, createThought, updateThought, deleteThought } = require('../server/controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

module.exports = router;