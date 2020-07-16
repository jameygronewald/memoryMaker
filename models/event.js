module.exports = function (sequelize,DataTypes){
    const Event = sequelize.define("Event",{
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
        }
    })
    // the associate property is to connect two tables together.
    Event.associate = function(model){
        Event.belongsTo(model.Event , {
            foreignKey: "EventId"
        })
    }
    return Event;
};
