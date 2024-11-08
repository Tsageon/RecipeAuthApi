const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { email, password, username, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already used' });
        }

        const newUser = new User({
            email,
            password,
            username,
            role
        });

 
        const saltRounds = 10;
        newUser.password = await bcrypt.hash(password, saltRounds);

        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: { email: newUser.email, username: newUser.username, role: newUser.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while registering the user' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,  
            { expiresIn: '8h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong during login' });
    }
};

exports.getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        res.status(200).json({
            email: user.email,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while fetching the user profile' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.userId;
    const { email, password, username, role } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email) user.email = email;
        if (username) user.username = username;
        if (role) user.role = role;

        if (password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(password, saltRounds);
        }

        await user.save();
        res.status(200).json({
            message: 'User updated successfully',
            user: { email: user.email, username: user.username, role: user.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while updating the user' });
    }
};
