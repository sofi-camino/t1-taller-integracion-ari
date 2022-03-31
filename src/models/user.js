'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.userToken, { as: 'userToken', foreignKey: 'user_id' });
    }
  };
  user.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notNull: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isAlphanumeric: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      },
    },
    psu_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isInt: true
      },
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    gpa_score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isFloat: true
      },
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isFloat: true
      },
    },
    promotion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    hospital: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    operations: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    medical_debt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isFloat: true
      },
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};