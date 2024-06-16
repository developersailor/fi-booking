import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {sequelize} from './index';


interface BookingAttributes {
  id: number;
  userId: number;
  hotelId: number;
  roomId: number;
  checkInDate: Date;
  checkOutDate: Date;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id'> {}

export default (sequelize: Sequelize, types: typeof DataTypes) => {
  class Booking extends Model {
    public id!: number;
    public userId!: number;
    public hotelId!: number;
    public roomId!: number;
    public checkInDate!: Date;
    public checkOutDate!: Date;
    static associate(models: any) {
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Booking.belongsTo(models.Hotel, {
        foreignKey: 'hotelId',
      });
      Booking.belongsTo(models.Room, {
        foreignKey: 'roomId',
      }),{
        sequelize,
        tableName: 'booking',
      };
    }
  }
  Booking.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    hotelId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'bookings',
  });
  return Booking;
}
