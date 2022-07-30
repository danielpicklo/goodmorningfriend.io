const express = require('express');
const router = express.Router();
const auth = require('../../middleware/token-auth');

//objects
const Profile = require('../../objects/Profile');

// @route   GET api/profile/me
// @desc    Get profile of associated id
// @access  Private
router.get('/me', auth, async (req, res) => {
  try{

    //searches for profile by user id
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', 
    ['name', 'salutation']);

    if(!profile){
      return res.status(400).json({ message: 'There is no profile for this user.' })
    }

    res.json(profile);

  }catch(error){
    console.error(error.message);
    res.status(500).send('Server error encountered');
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, async (req, res) => {
  const { status, friends, goodMorningsGiven, goodMorningsHad } = req.body;

  //build profile fields
  const fields = {};
  fields.user = req.user.id;
  if(status) fields.status = status;
  if(goodMorningsGiven) fields.goodMorningsGiven = goodMorningsGiven;
  if(goodMorningsHad) fields.goodMorningsHad = goodMorningsHad;
  if(friends){
    fields.friends = friends.split(',').map(friend => friend.trim());
  }

  try{
    let profile = await Profile.findOne({ user: req.user.id });

    //find and update profile
    if(profile){
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id }, 
        { $set: fields }, 
        { new: true }
      );

      return res.json(profile);
    }

    //create new profile
    profile = new Profile(fields);
    await profile.save();
    res.json(profile);

  }catch(error){
    console.error(error.message);
    res.status(500).send('Server error encountered');
  }
});

module.exports = router;