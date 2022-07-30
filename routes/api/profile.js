const express = require('express');
const router = express.Router();
const auth = require('../../middleware/token-auth');

//objects
const Profile = require('../../objects/Profile');
const User = require('../../objects/User');

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

// @route   GET api/profile
// @desc    Get all profiles in database
// @access  Public
router.get('/', async (req, res) => {
  try{
    const profiles = await Profile.find().populate('user', ['name', 'email']);
    res.json(profiles);
  }catch (error){
    console.error(error.message);
    res.status(500).send('Server error encountered');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try{
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'email']);

    if(!profile){
      return res.status(400).json({ message: 'This profile does not exist' });
    }

    res.json(profile);
  }catch (error){
    console.error(error.message);

    if(error.kind == 'ObjectId'){
      return res.status(400).json({ message: 'This profile does not exist' });
    }
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

// @route   DELETE api/profile
// @desc    Delete profile, user, & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try{

    //remove the profile and user
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ message: `User ${ req.user.id } removed.` });
  }catch (error){
    console.error(error.message);
    res.status(500).send('Server error encountered');
  }
});

// @route   PUT api/profile/friend/:id
// @desc    Add friends to profile
// @access  Private
router.put('/friend/:id', auth, async (req, res) => {
  try{

    //get profile of user adding friend
    let profile = await Profile.findOne({ user: req.user.id });

    //search for friend user id
    const friendProfile = await Profile.findOne({ user: req.params.id });
    const friendUser = await User.findOne({ id: profile.user });
    const newFriend = {
      user: friendProfile.user,
      name: friendUser.name
    }

    //check to see if user is yourself
    if(profile.user.toString() == req.params.id.toString()){
      return res.status(403).json({ message: 'You cannot become your own friend :(' }); 
    }

    //check to see if user is already a friend
    const friends = profile.friends;
    const friendExists = friend => friend.user.toString() == newFriend.user.toString();
    if(friends.some(friendExists)){
      return res.status(403).json({ message: 'This user is already your friend' });
    }

    profile.friends.unshift(newFriend);
    await profile.save();

    res.json(profile);
  }catch(error){
    console.error(error.message);
    res.status(500).send('Server error encountered');
  }
});

// @route   DELETE api/profile/friend/:id
// @desc    Remove friends to profile
// @access  Private
router.delete('/friend/:id', auth, async (req, res) => {
  try{
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const index = profile.friends.map(friend => friend.id).indexOf(req.params.id);
    profile.friends.splice(index, 1);

    await profile.save();
    res.json(profile);
  }catch(error){
    console.error(error.message);
    res.status(500).send('Server error encountered');
  }
});

module.exports = router;