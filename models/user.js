module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      msgNr: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      postNr: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      registrationDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      lastSeenOn: {
        type: DataTypes.DATE,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profileViews: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    })
    User.associate = function (models) {
      User.belongsToMany(models.Post, {
        through: models.UserPost,
        as: 'posts',
        foreignKey: 'userId'
      });
    //   Candidate.belongsToMany(models.Company, {
    //     through: models.CandidateCompany,
    //     as: 'companies',
    //     foreignKey: 'candidateId'
    //   });
    };
    return User
  }
  