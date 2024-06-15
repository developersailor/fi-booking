import { Sequelize, DataTypes } from 'sequelize';
import HotelFactory from './hotel';
import RoomFactory from './room';
import BookingFactory from './booking';

const sequelize = new Sequelize('fibooking_development', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

const Hotel = HotelFactory(sequelize, DataTypes);
const Room = RoomFactory(sequelize, DataTypes);
const Booking = BookingFactory(sequelize, DataTypes);

const models = {
  Hotel,
  Room,
  Booking,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;