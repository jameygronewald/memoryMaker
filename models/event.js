module.exports = function (sequelize, DataTypes) {
  const Event = sequelize.define("Event", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 140],
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 3000],
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 140],
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  // the associate property is to connect two tables together.
  Event.associate = function (models) {
    Event.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
    });
  };
  Event.associate = function (models) {
    Event.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Event.associate = function (models) {
    Event.hasMany(models.Image);
  };
  return Event;
};
