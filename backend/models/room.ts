import { Model, DataTypes, Sequelize } from 'sequelize';

interface RoomAttributes {
  id?: number;
  name: string;
  type: string;
  price: number;
  hotelId: number;
}

export default (sequelize: Sequelize, types: typeof DataTypes) => {
  class Room extends Model<RoomAttributes> implements RoomAttributes {
    public id!: number;
    public name!: string;
    public type!: string;
    public price!: number;
    public hotelId!: number;

    static associate(models: any) {
      Room.belongsTo(models.Hotel, {
        foreignKey: 'hotelId',
        as: 'hotel'
      });
    }
  }

  Room.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hotelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );

  return Room;
};
