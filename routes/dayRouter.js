const express = require("express")
const dayRouter = express.Router()
const Day = require("../models/day.js")

dayRouter.get("/", (req, res, next) => {
    Day.find((err, days) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(days)
    })
})
dayRouter.get("/dayId", (req, res, next) => {
    Day.findOne({ _id: req.params.dayId }, (err, day) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(day)
    })
})
dayRouter.post("/", (req, res, next) => {
    const newDay = new Day(req.body) 
    newDay.save(( err, savedDay) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedDay) 
    })
})
dayRouter.delete("/dayId", (req, res, next) => {
    Day.findOneAndDelete({ _id: req.params.dayId }, (err, deletedDay) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`successfully deleted ${deletedDay.weeklyPlans}`)
    })
})
dayRouter.put("/dayId", (req, res, next) => {
    Day.findOneAndUpdate({ _id: req.params.dayId }, req.body, {new: true}, (err, updatedDay ) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(202).send(updatedDay)
    })
})

module.exports = dayRouter