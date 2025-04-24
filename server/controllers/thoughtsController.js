const Thought = require('../server/models/Thought');
const User = require('../server/models/User');

const getThoughts = async (req, res) => {
     try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }};
const getThoughtById = async (req, res) => { 
    const { thoughtId } = req.params;
        try {
          const thought = await Thought.findById(thoughtId);
          if(thought) {
            res.json(thought);
          } else {
            res.status(404).json({
              message: 'Thought not found'
            });
          }
        } catch (error) {
          res.status(500).json({
            message: error.message
          });
        }
 };
const createThought = async (req, res) => { 
    const thought = req.body;
        try {
          const newThought = await Thought.create({
            thought
          });
          res.status(201).json(newThought);
        } catch (error) {
          res.status(400).json({
            message: error.message
          });
        }
};
const updateThought = async (req, res) => { try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought)
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }};
const deleteThought = async (req, res) => { 
     try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
          
          if(!thought) {
            res.status(404).json({
              message: 'No thought with that ID'
            });
          } else {
            await User.findOneAndUpdate({ thoughts: thought._id  },{$pull:{thoughts: thought._id}}, { new: true });
            res.json({ message: 'Thought and UserThoughts deleted!' });
          }
          
        } catch (error) {
          res.status(500).json({
            message: error.message
          });
        }
};

const addReaction = async (req, res) => {
    const { thoughtId } = req.params;
    const reaction = req.body;

    try {
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $addToSet: { reactions: reaction } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteReaction = async (req, res) => {
    const { thoughtId, reactionId } = req.params;

    try {
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { getThoughts, getThoughtById, createThought, updateThought, deleteThought ,addReaction, deleteReaction };