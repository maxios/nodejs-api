'use strict';
module.exports = (sequelize, DataTypes) => {
  const Faq = sequelize.define('Faq', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    question: DataTypes.STRING,
    answer: DataTypes.TEXT
  }, {});
  Faq.associate = function(models) {
    // associations can be defined here
  };
  return Faq;
};
