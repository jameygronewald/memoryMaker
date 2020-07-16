module.exports = function (sequelize,DataTypes){
    const Description = sequelize.define("Description",{
        DescriptionName: {
            type: DataTypes.STRING,
        },
    })
    // 
    Description.associate = function(model){
        Description.belongsTo(model.Event , {
            foreignKey : "EventID"
        });
    }
}