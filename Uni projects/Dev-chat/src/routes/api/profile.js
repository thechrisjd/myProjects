const express = require('express')
const router = express.Router()
const {check, validationResult } = require('express-validator')
//call auth middleware as this is a protected route
const auth = require('../../middleware/auth')

const Profile = require('../../models/Profile')
const User = require('../../models/User')



//************************************************************************************************\\
//                            Api's for getting profiles
//************************************************************************************************\\

// @router GET api/profile
// @decs Getting all profiles
// @ Public route

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    return res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


//************************************************************************************************\\


// @route  GET api/profile/me
// @desc   getting users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    //I am looking for the logined in users profile, I have the foriegn like key in profile and the user id in the request
    //I want to get some information from the the user collection so I use populate
    // this takes two args: the collect, and the required information
    const profile = await Profile.findOne({ user : req.user.id }).populate(
      'user',
      ['name', 'avatar']
    )

    //if the profile doesn't exist return error
    if (!profile) {
      return res.status(400).json({ msg : 'There is no information about this profile'})
    }

    //send profile to frontend
    res.json(profile)
  } catch (err) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

//************************************************************************************************\\


// @router GET api/profile/user/:user_id
// @decs Getting all profiles
// @ Public route

router.get('/user/:user_id', async (req, res) => {
  const requestedUserId = req.params.user_id
  try {
    const profile = await Profile.findOne({user : requestedUserId}).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({msg : 'Profile not found for this user'})
    }

    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(400).json({msg : 'Profile not found for this user'})
    }
    res.status(500).send('Server error')
  }
})



//************************************************************************************************\\
//                            Api's for creating/deleting a profile
//************************************************************************************************\\

// @route  POST api/profile
// @desc   Creating or updating a user profile
// @access Private
router.post('/', [
  auth,
  [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills are required').not().isEmpty()
  ]], async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({errors : error.array()})
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body

  // Building profile Object
  const profileField = {}
  profileField.user = req.user.id
  if(company) profileField.company = company
  if(website) profileField.website = website
  if(location) profileField.location = location
  if(bio) profileField.bio = bio
  if(status) profileField.status = status
  if(githubusername) profileField.githubusername = githubusername
  if(skills) {
    //this takes a list of sills, places the skill into an array where there is a comma
    //we use the map function to loop through the skills array and trim out any extra space
    profileField.skills = skills.split(',').map(skill => skill.trim())
  }

  //Build the social object. Look at the Profile scheme to see data layout
  profileField.social = {}
  if(youtube) profileField.social.youtube = youtube
  if(facebook) profileField.social.facebook = facebook
  if(twitter) profileField.social.twitter = twitter
  if(instagram) profileField.social.instagram = instagram
  if(linkedin) profileField.social.linkedin = linkedin

  try {
    //finding users profile. using let as we will reset this value
    let profile = await Profile.findOne({ user : req.user.id })

    //if the users profile exists we will update it
    if (profile) {
      //update existing profile
      //the three options: which user, $set to uodate profile and new
      profile = await Profile.findOneAndUpdate(
        { user : req.user.id },
        { $set : profileField },
        { new : true }
      )

      // return the profile to the front end
      return res.json(profile)
    }

    //if the profile doesn't exist we need to create one
    //Input the profileField data into the profile schema. And save it to the database.
    profile = new Profile(profileField)
    await profile.save()
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


//************************************************************************************************\\

// @router DELETE api/profile
// @decs deletes a user and profile
// @ Private route

router.delete('/', auth, async (req, res) => {
  try {
    //This will remove the users profile
    await Profile.findOneAndRemove({ user: req.user.id })
    // This wil remove the user
    await User.findOneAndRemove({ _id: req.user.id })
    return res.json({msg : 'User deleted'})
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


//************************************************************************************************\\
//                            Api's for adding/deleting experience
//************************************************************************************************\\

// @router PUT api/profile/experience
// @decs Adds the users experiences to there profile
// @ Private route
router.put('/experience', [
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company name is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
  ]
], async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({errors : error.array()})
  }

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }

  try {
    let profile = await Profile.findOne({ user : req.user.id })

    profile.experience.unshift(newExp)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})


//************************************************************************************************\\

// @router DELETE api/profile/experience/:exp_id
// @decs deletes a users experience
// @ Private route

router.delete('/experience/:exp_id', auth, async (req, res) => {

  try {
      //Getting the users profile
      let profile = await Profile.findOne({user : req.user.id})

      //experience is an array, so I map over each item id in the array
      //and where the req.params.exp_id matches the index will be saved into the variable
      const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

      //removed the matching item index and remove only one
      profile.experience.splice(removeIndex, 1)

      //save the new profile
      await profile.save()

      //send the new profile to frontend
      res.json(profile)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})



//************************************************************************************************\\
//                              Api's for  Adding or deleting education
//************************************************************************************************\\

// @router PUT api/profile/education
// @decs Adds the users education to there profile
// @ Private route

router.put('/education', [auth, [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({errors : error.array()})
  }

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = req.body

  const newEducation = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  }

  try {
    let profile = await Profile.findOne({ user : req.user.id })

    profile.education.unshift(newEducation)

    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})



//************************************************************************************************\\


// @router DELETE api/profile/education/:edxp_id
// @decs deletes a users education
// @ Private route

router.delete('/education/:edxp_id', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user : req.user.id})

    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edxp_id)

    profile.education.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})


module.exports = router
