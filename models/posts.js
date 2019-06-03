module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      dateOfPosting: {
        type: DataTypes.DATE,
        allowNull: false
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      shortText: {
        type: DataTypes.STRING,
        allowNull: false
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    })
    Post.associate = function (models) {
        Post.belongsToMany(models.User, {
            through: models.UserPost,
            as: 'user',
            foreignKey: 'postId'
          });
    //   Candidate.belongsToMany(models.Technology, {
    //     through: models.CandidateTechnology,
    //     as: 'technologies',
    //     foreignKey: 'candidateId'
    //   });
    //   Candidate.belongsToMany(models.Company, {
    //     through: models.CandidateCompany,
    //     as: 'companies',
    //     foreignKey: 'candidateId'
    //   });
    };
    return Post
  }
  