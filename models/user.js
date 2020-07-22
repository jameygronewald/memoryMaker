module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    username: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 140],
      },
    },
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 140],
      },
    },
    // First name required
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    // Last name required
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
  });

  User.associate = function (models) {
    User.hasMany(models.Event);
  };
  return User;
};