require('./model')
const mongoose = require("mongoose");
const Feedback = mongoose.model('Feedback')

exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback({
      user: req.userId,
      feedback: req.body.feedbackText
    })
    
    const savedFeedback = await feedback.save()
    return res.success(savedFeedback)
  } catch (error) {
    console.error(error)
    return res.preconditionFailed(error.errorMessage)
  }
}