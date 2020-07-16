module.exports = function (sequelize,DataTypes){
    const Event = sequelize.define("Event",{
        userId: {
            type: DataTypes.INTEGER
        },
        categoryId: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.INTEGER
        }
    })
    // the associate property is to connect two tables together.
    Event.associate = function(model){
        Event.belongsTo(model.User , {
            foreignKey: {
                name: "userId",
                allowNull: false
            }
        });
    };
    Event.associate = function(model){
        Event.belongsTo(model.Category , {
            foreignKey: {
                name: "categoryId",
                allowNull: false
            }
        });
    };
    Event.associate = function(model){
        Event.hasMany(model.Images)
    };
    return Event;
};
