module.exports = function (sequelize,DataTypes){
    const Images = sequelize.define("Images",{
        eventId: {
            type: DataTypes.INTEGER
        },
        URL: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        caption: {
            type: DataTypes.STRING,
        },
        altAttribute: {
            type: DataTypes.STRING
        }
    })
 
    Images.associate = function(model){
        Images.belongsTo(model.Event , {
            foreignKey : {
                name: 'eventId',
                allowNull: false
            },
        });
    }
}