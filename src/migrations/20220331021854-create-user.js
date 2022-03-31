'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
          notNull: true,
          notEmpty: true,
        }

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
          notNull: true,
          notEmpty: true,
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notNull: true,
          notEmpty: true,
        }

      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          notNull: true,
          notEmpty: true,
        }
      },
      psu_score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          notNull: true,
          notEmpty: true,
        }
      },
      university: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      gpa_score: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          notNull: true,
          notEmpty: true,
        }
      },
      job: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      salary: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          notNull: true,
          notEmpty: true,
        }
      },
      promotion: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      hospital: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      operations: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      medical_debt: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          notNull: true,
          notEmpty: true,
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};