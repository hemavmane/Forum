module.exports = (sequelize, DataTypes) => {
    return sequelize.define("ForumPost", {
        title: { type: DataTypes.STRING(255), allowNull: false },
        body: { type: DataTypes.TEXT, allowNull: false },
        page_slug: { type: DataTypes.STRING, allowNull: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
};