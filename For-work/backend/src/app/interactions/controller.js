const mongoose = require("mongoose");
const Interaction = mongoose.model('Interaction')

exports.createInteraction = async (req, res) => {
  const interactionData = {
    student: req.userId,
    campaign: req.body.campaign,
    type: req.body.type,
    description: req.body.description
  }

  try {
    // update(find a document with that filter, document to insert when nothing was found, {upsert:true})
    const savedInteraction = await Interaction.update(interactionData, interactionData, {
      upsert: true
    })

    if (savedInteraction) {
      return res.success()
    } else {
      return res.serverError('Could not create database record.')
    }
  } catch (error) {
    return res.preconditionFailed(error)
  }
}