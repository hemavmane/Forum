module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Reply", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
};