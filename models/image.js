module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define("Image", {
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    name: { type: DataTypes.STRING },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Image.associate = function (models) {
    Image.belongsTo(models.Event, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Image;
};
