const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Entry extends Model {}

Entry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    workout_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workout',
        key: 'id'
      }
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exercise',
        key: 'id'
      }
    },

    set_count: {
      type: DataTypes.INTEGER
    },
    rep_count: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.STRING
    },
    rest: {
      type: DataTypes.STRING
    },
    effort: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'entry'
  }
);

module.exports = Entry;