module.exports = function (sequelize,DataTypes){
    const Event = sequelize.define("Event",{
        Title: {
            type: DataTypes.STRING
        },
        Dates: {
            type: DataTypes.STRING
        }
    })
    // the associate property is to connect two tables together.
    Event.associate = function(model){
        Event.belongsTo(model.Event , {
            foreignKey: "EventID"
        })
    }
    return Event;
};
