
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false
});


const userModel = require("./user")(sequelize, DataTypes);
const postModel = require("./ForumPost")(sequelize, DataTypes);
const replyModel = require("./Reply")(sequelize, DataTypes);



userModel.hasMany(postModel, { foreignKey: "userId", onDelete: "CASCADE", as: "Posts" });
postModel.belongsTo(userModel, { foreignKey: "userId", as: "User" });


postModel.hasMany(replyModel, { foreignKey: "postId", onDelete: "CASCADE", as: "Replies" });
replyModel.belongsTo(postModel, { foreignKey: "postId", as: "Post" });

userModel.hasMany(replyModel, { foreignKey: "userId", onDelete: "CASCADE", as: "Replies" });
replyModel.belongsTo(userModel, { foreignKey: "userId", as: "User" });

replyModel.hasMany(replyModel, {
    foreignKey: "parentId",
    as: "Children"
});

replyModel.belongsTo(replyModel, {
    foreignKey: "parentId",
    as: "Parent"
});

module.exports = {
    sequelize,
    Sequelize,
    userModel,
    postModel,
    replyModel
};