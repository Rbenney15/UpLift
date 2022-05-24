const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Exercise extends Model {}

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    exercise_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [1]
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'exercise'
  }
);

module.exports = Exercise;