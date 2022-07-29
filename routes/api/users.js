const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//objects
const User = require('../../objects/User');

// @route   POST api/users
// @desc    Register a new user
// @access  Public
router.post('/', [
    check('name', 'Name required').not().isEmpty(),
    check('email', 'Email required').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    try{
        let user = await User.findOne({ email });

        //check if user currently exists
        //if a user exists, return a 400 error
        if(user){
            res.status(400).json({ errors: [{ message: 'User with this email already exists!' }] });
        }

        //create new instance of User
        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //create payload and sign token
        const payload = {user: {d: user.id}}
        jwt.sign(payload, config.get('secret'), { expiresIn: 3600 }, (error, token) => {
            if(error) throw error;
            res.json({ token });
        });
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error encountered');
    }
});

// @route   DELETE api/users
// @desc    Delete a user
// @access  Public
router.delete('/', async (req, res) => {
    const {email} = req.body;

    try{
        let user = await User.findOne({ email });

        //deletes current user if they exist
        if(user){
            await user.delete();
            res.send(`USER DELETED: ${email}`);
        }else{
            res.status(400).json({ errors: [{ message: `There is no user with this email address (${email})` }] });
        }       
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error encountered');
    }
});

module.exports = router;