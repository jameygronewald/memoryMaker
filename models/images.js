module.exports = function (sequelize,DataTypes){
    const Images = sequelize.define("Images",{
        ImagesName: {
            type: DataTypes.STRING,
        },
    })
    // 
    Images.associate = function(model){
        Images.belongsTo(model.Event , {
            foreignKey : {
                allowNull : false
            },
        });
    }
}