const User = require('../models/user');
const Thought = require('../models/thought');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('friends').populate('thoughts');
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).poopulate('friends').populate('thoughts');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const createUser = async (req, res) => {
    const user = req.body;
    try {
        const newUser = await User.create({
            user
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }

        res.json(user)
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            res.status(404).json({
                message: 'No user with that ID'
            });
        } else {
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and users deleted!' });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User.findOneAndUpdate({ _id: userId }, { $addToSet: { friends: friendId } }, { new: true });
        if (!user) {
            res.status(404).json({
                message: 'No user with that ID'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const deleteFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User.findOneAndUpdate({ _id: userId }, { $pull: { friends: friendId } }, { new: true });
        if (!user) {
            res.status(404).json({
                message: 'No user with that ID'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend };