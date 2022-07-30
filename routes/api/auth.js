const express = require('express');
const router = express.Router();
const config = require('config');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/token-auth');

//objects
const User = require('../../objects/User');

// @route   GET api/auth
// @desc    Get JWT to authenticate user
// @access  Public
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error encountered');
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
    check('email', 'Email required').isEmail(),
    check('password', 'Password is required to log in').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try{
        let user = await User.findOne({ email });

        //check to see if user exists
        if(!user){
            return res.status(400).json({ errors: [{ message: 'User does not exist' }] });
        }

        //check to see if entered password matches password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ errors: [{ message: 'Invalid password' }] });
        }

        //create payload and sign token
        const payload = {user: {id: user.id}}
        jwt.sign(payload, config.get('secret'), { expiresIn: 3600 }, (error, token) => {
            if(error) throw error;
            res.json({ token });
        });
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error encountered');
    }
});

module.exports = router;