const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/third-habits-db",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
    },
    () => console.log("connected to the database")
)

app.use("/days", require("./routes/dayRouter.js"))
app.use("/users", require("./routes/userRouter.js"))

app.use((err, req, res, next) => {
    return res.send({ errMsg: err.message })
})

app.listen(9000, () => {
    console.log("successfully running on port 9000")
})