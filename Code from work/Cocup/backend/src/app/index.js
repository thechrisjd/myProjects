const express = require('express')
const userRouter = require('./user/router')
const campaignRouter = require('./campaigns/router.js')
const userController = require('./user/controller')
const imageUploadRouter = require('./services/router')
const authenticateUser = require('../middlewares/authentication')
const feedRouter = require('./feed/router')
const authRouter = require('./auth/router')
const interactionsRouter = require('./interactions/router')
const tokenRouter = require('./token/router')
const metricsRouter = require('./metrics/router')
const botCampaignsRouter = require('./bot-campaigns/router')
const feedbackRouter = require('./feedback/router')
const skillRouter = require('./skills/router')
const emailRouter = require('./mails/router')
const publicRouter = require('./public/router')
const vendorRouter = require('./vendor/router')
const adminRouter = require('./admin/router')


const apiVersion = 



module.exports = (app) => {
  app.use(express.json({ extended : false }))
  app.use(`/${apiVersion}/auth`, authRouter)
  // User Auth - declared here for shorter url route
  app.post(`/${apiVersion}/login`, userController.login)
  app.post(`/${apiVersion}/register`, userController.register)

  // Object routes
  app.use(`/${apiVersion}/users`, authenticateUser, userRouter)
  app.use(`/${apiVersion}/campaigns`, authenticateUser, campaignRouter)
  app.use(`/${apiVersion}/feed`, feedRouter)
  app.use(`/${apiVersion}/interactions`, authenticateUser, interactionsRouter)
  app.use(`/${apiVersion}/tokens`, authenticateUser, tokenRouter)
  app.use(`/${apiVersion}/metrics`, authenticateUser, metricsRouter)
  app.use(`/${apiVersion}/bot-campaigns`, authenticateUser, botCampaignsRouter)
  app.use(`/${apiVersion}/feedback`, authenticateUser, feedbackRouter)
  app.use(`/${apiVersion}/skills`, authenticateUser, skillRouter)
  app.use(`/${apiVersion}/reset-password/reset`, emailRouter)



  //Vendor routes
    app.use(`/${apiVersion}/vendor`, vendorRouter)

  //Admin routes
    app.use(`/${apiVersion}/admin/students`, adminRouter)

  // Service routes
  app.use(`/${apiVersion}/`, imageUploadRouter)
  app.post(`/${apiVersion}/check-user`, userController.checkUser)

  // Public routes - TODO move all public api's into this module
  app.use(`/${apiVersion}/`, publicRouter)

  app.get('/status', (req, res) => {
    res.send('OK!')
  })
}
