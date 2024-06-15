import { Model, DataTypes, Sequelize } from 'sequelize';

interface BookingAttributes {
  id?: number;
  checkInDate: Date;
  checkOutDate: Date;
  hotelId: number;
  roomId: number;
  userId: number;
}

export default (sequelize: Sequelize, types: typeof DataTypes) => {
  class Booking extends Model<BookingAttributes> implements BookingAttributes {
    public id!: number;
    public checkInDate!: Date;
    public checkOutDate!: Date;
    public hotelId!: number;
    public roomId!: number;
    public userId!: number;

    static associate(models: any) {
      Booking.belongsTo(models.Hotel, {
        foreignKey: 'hotelId',
        as: 'hotel'
      });
      Booking.belongsTo(models.Room, {
        foreignKey: 'roomId',
        as: 'room'
      });
    }
  }

  Booking.init(
    {
      userId:{
        type: DataTypes.INTEGER,
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
      hotelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );

  return Booking;
};
