import { Model, DataTypes, Sequelize } from 'sequelize';

interface HotelAttributes {
  id?: number;
  name: string;
  description: string;
  images: object[];
}

export default (sequelize: Sequelize, types: typeof DataTypes) => {
  class Hotel extends Model<HotelAttributes> implements HotelAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public images!: object[];

    static associate(models: any) {
      Hotel.hasMany(models.Room, {
        foreignKey: 'hotelId',
        as: 'rooms'
      });
      Hotel.hasMany(models.Booking, {
        foreignKey: 'hotelId',
        as: 'bookings'
      });
    }
  }

  Hotel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Hotel',
    }
  );

  return Hotel;
};
