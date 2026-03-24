module.exports = (sequelize, DataTypes) => {
    return sequelize.define("ForumPost", {
        title: { type: DataTypes.STRING, length: 18 },
        body: DataTypes.TEXT
    })
}