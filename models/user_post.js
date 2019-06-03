'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPost = sequelize.define('UserPost', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  UserPost.associate = (models) => {
  };
  return UserPost;
};