const express = require('express')
const router = express.Router()
const {check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')



//************************************************************************************************\\
//                               Api's for posts
//************************************************************************************************\\



// @route  GET api/posts
// @desc   Getting all users posts
// @access Private

router.get('/', auth, async (req, res) => {
  try {
      const posts = await Post.find().sort({ date : -1})
      res.json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

//************************************************************************************************\\


// @route  GET api/posts/:post_id
// @desc   Getting all users posts
// @access Private

router.get('/:post_id', auth, async (req, res) => {
  try {
      const post = await Post.findById(req.params.post_id)

      if (!post) {
        return res.status(404).json({ msg : "Post not found"})
      }

      res.json(post)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg : "Post not found"})
    }
    res.status(500).send('Server error')
  }
})


//************************************************************************************************\\

// @route  POST api/posts
// @desc   saving a user upload
// @access Private

router.post('/', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {

  //Validating data sent from the front end
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({errors : error.array()})
  }
  try {
    //Finding the user and returning all data but there password
    const user = await User.findById(req.user.id).select('-password')

    //creating a new post object based on the Post schema
    // by inputting the required data
    const newPost = new Post ({
      text : req.body.text,
      name : user.name,
      avatar : user.avatar,
      user : req.user.id
    })

    //saving the post into the database
    const post = await newPost.save()

    //return the post to the frontend
    res.json(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


//************************************************************************************************\\

// @route  DELETE api/posts/:post_id
// @desc   Deletes a post
// @access Private

router.delete('/:post_id', auth, async (req, res) => {
  try {
    //finding finding post by its id
      const post = await Post.findById(req.params.post_id)

      if (!post) {
        return res.status(404).json({ msg : "Post not found"})
      }

      //the post.user is an object, and do will never match the req.user.id
      //therefore I used the toString() to turn the object into a String
      //If the users id doesnt match the user who created the post then they cant remove it
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg : "User not authorized"})
      }

      //this removes the post
      await post.remove()
      res.json({ msg : "Post removed"})
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg : "Post not found"})
    }
    res.status(500).send('Server error')
  }
})


//************************************************************************************************\\
//                               Api's for liking/disliking posts
//************************************************************************************************\\

// @route  PUT api/posts/likes/:post_id
// @desc   Adds a like to a post
// @access Private

router.put('/likes/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)

    if (!post) {
      return res.status(404).json({ msg : "Post not found"})
    }

    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg : "You have already liked this."})
    }

    post.likes.unshift({ user : req.user.id})

    await post.save()

    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg : "Post not found"})
    }
    res.status(500).send('Server error')
  }
})


//************************************************************************************************\\


// @route  PUT api/posts/unlikes/:post_id
// @desc   Removes a like from a post
// @access Private

router.put('/unlikes/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)

    if (!post) {
      return res.status(404).json({ msg : "Post not found"})
    }

    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg : "You have have not liked this post."})
    }

    const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)

    //removed the matching item index and remove only one
    post.likes.splice(removeIndex, 1)

    await post.save()

    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg : "Post not found"})
    }
    res.status(500).send('Server error')
  }
})



//************************************************************************************************\\
//                               Api's for commenting on posts
//************************************************************************************************\\


// @route  PUT api/posts/comments/:post_id
// @desc   adds a comment to a post
// @access Private

router.put('/comments/:post_id', [
  auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({ errors : error.array()})
  }
  try {
    const post = await Post.findById(req.params.post_id)

    if (!post) {
      return res.status(404).json({ msg : "Post not found."})
    }

    const user = await User.findById(req.user.id).select('-password')


    const newComment = {
      text : req.body.text,
      name : user.name,
      avatar :user.avatar,
      user : req.user.id
    }

    post.comments.unshift(newComment)

    await post.save()
    res.send(post.comments)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg : "Post not found."})
    }
    res.status(500).send('Server error')
  }
})


//************************************************************************************************\\

// @route  delete api/posts/remove-comments/:post_id/:comment_id
// @desc   removes a comment from a post
// @access Private

router.delete('/remove-comments/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id)

    if (!post) {
      return res.status(404).json({ msg : "Post not found."})
    }


    const comment = post.comments.find(comment => comment.id === req.params.comment_id)

    if (!comment) {
      return res.status(404).json({ msg : "Comment does not exist"})
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg : "User not authorized" })
    }


    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)

    //removed the matching item index and remove only one
    post.comments.splice(removeIndex, 1)

    await post.save()

    res.json(post.comments)

  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg : "Post not found."})
    }
    res.status(500).send('Server error')
  }
})


module.exports = router
