const express = require("express")
const userRouter = express.Router()
const User = require("../models/user.js")

userRouter.get("/", (req, res, next) => {
    User.find((err, users) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
})
userRouter.get("/userId", (req, res, next) => {
    User.findOne({ _id: req.params.userId }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})
userRouter.post("/", (req, res, next) => {
    const newUser = new User(req.body) 
    newUser.save((err, savedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
})
userRouter.deleted("/userId", (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.userId }, (err, deletedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`successfully deleted ${deletedUser.user}`) 
    })
})
userRouter.put("/userId", (req, res, next) => {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {new: true}, (err, updatedUser) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(202).send(udpatedUser)
    })
})

module.exports = userRouter