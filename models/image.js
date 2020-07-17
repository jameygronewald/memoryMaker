module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define("Image", {
    URL: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 140],
      },
    },
    altAttribute: {
      type: DataTypes.STRING,
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
