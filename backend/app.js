require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./models/index")

const app = express()

app.use(express.json())
app.use(cors())

const userRoute = require("./routes/user")
const ForumPostRoute = require("./routes/forumpost")
const RplyRoute = require("./routes/replies")

app.use("/api/auth", userRoute)
app.use("/api/forumpost", ForumPostRoute)
app.use("/api/reply", RplyRoute)


const PORT = process.env.PORT
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${process.env.PORT}`)
    })
})