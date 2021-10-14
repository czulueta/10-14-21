const mongoose = require("mongoose")
const Schema = mongoose.Schema

const daySchema = new Schema({
    weeklyPlans: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Day", daySchema)