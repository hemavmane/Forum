const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false
})

const userModel = require("./user")(sequelize, Sequelize)
const postModel = require("./ForumPost")(sequelize, Sequelize)
const replyModel = require("./Reply")(sequelize, Sequelize)


userModel.hasMany(postModel, { foreignKey: "userId", onDelete: "CASCADE" })
postModel.belongsTo(userModel, { foreignKey: "userId" })

postModel.hasMany(replyModel, { foreignKey: "postId", onDelete: "CASCADE" })
replyModel.belongsTo(postModel, { foreignKey: "postId" })