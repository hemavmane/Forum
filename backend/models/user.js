module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING
    })
}