module.exports = function (sequelize,DataTypes){
    const Category = sequelize.define("Category",{
        categoryName: {
            type: DataTypes.STRING,
        },
    })
    // the associate property is to connect two tables together.
    Category.associate = function(model){
        Category.belongsTo(model.Event , {
            foreignKey: "EventId"
        })
    }
    return Category;
};
