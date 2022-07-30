const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/token-auth');

//objects
const User = require('../../objects/User');
const Post = require('../../objects/Post');
const Profile = require('../../objects/Profile');

// @route   POST api/posts/:to_id
// @desc    Create a post
// @access  Private
router.post('/:to_id', [auth, [
  check('text', 'Content is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      user: req.user.id,
      sent_to: req.params.to_id
    });

    const post = await newPost.save();
    res.json(post);

  }catch(error){
    console.error(error.message);
    res.status(500).send('Server error encountered');
  }
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try{
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);

  }catch(error){
    console.error(error.message);
    res.status(500).send('Server error encountered');
  }
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({ message: `Post (${ req.params.id }) not found` });
    }

    res.json(post);

  }catch(error){
    console.error(error.message);

    if(error.kind == 'ObjectId'){
      return res.status(404).json({ message: `Post (${ req.params.id }) not found` });
    }

    res.status(500).send('Server error encountered');
  }
});

// @route   GET api/posts/for/:id
// @desc    Get posts for a user by their id
// @access  Public
router.get('/for/:id', async (req, res) => {
  try{
    const posts = await Post.find({ sent_to: req.params.id }).sort({ date: -1 });
    if(!posts){
      return res.status(404).json({ message: `Posts for user (${ req.params.id }) not found` });
    }

    res.json(posts);

  }catch(error){
    console.error(error.message);

    if(error.kind == 'ObjectId'){
      return res.status(404).json({ message: `Posts for user (${ req.params.id }) not found` });
    }

    res.status(500).send('Server error encountered');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({ message: `Post (${ req.params.id }) not found` });
    }

    //check to make sure user created post
    if(post.user.toString() !== req.user.id){
      return res.status(403).json({ message: `User (${ req.user.id }) not authorized to delete post by user (${ post.user })` });
    }

    await post.remove();
    res.json({ message: `Post (${ req.params.id }) successfully removed` });

  }catch(error){
    console.error(error.message);

    if(error.kind == 'ObjectId'){
      return res.status(404).json({ message: `Post (${ req.params.id }) not found` });
    }

    res.status(500).send('Server error encountered');
  }
});

// @route   PUT api/posts/love/:id
// @desc    Love a post
// @access  Private
router.put('/love/:id', auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);

    //check if user has already loved post
    if(post.loves.filter(love => love.user.toString() === req.user.id).length > 0){
      const index = post.loves.map(love => love.user.toString().indexOf(req.user.id));
      post.loves.splice(index, 1);
    }else{
      post.loves.unshift({ user: req.user.id });
    }

    await post.save();
    res.json(post.loves);

  }catch(error){
    console.error(error.message);
    res.status(500).send('Server error encountered');
  }
});

module.exports = router;