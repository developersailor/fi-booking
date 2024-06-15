// models/booking.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    username: DataTypes.STRING,
    checkInDate: DataTypes.DATE,
    checkOutDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
