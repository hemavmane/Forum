module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Reply", {
        body: DataTypes.TEXT
    })
}