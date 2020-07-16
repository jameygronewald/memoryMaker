module.exports = function (sequelize,DataTypes){
    const Category = sequelize.define("Category",{
        CategoryName: {
            type: DataTypes.STRING,
        },
    })
    // the associate property is to connect two tables together.
    Category.associate = function(model){
        Category.belongsTo(model.Event , {
            foreignKey: "EventID"
        })
    }
    return Category;
};
