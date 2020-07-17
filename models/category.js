module.exports = function (sequelize,DataTypes){
    const Category = sequelize.define("Category",{
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [10, 100]
            }
          },
    })
    // the associate property is to connect two tables together.
    Category.associate = function(models){
        Category.hasMany(models.Event)
    };
    return Category;
};
