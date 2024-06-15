"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const hotel_1 = __importDefault(require("./hotel"));
const room_1 = __importDefault(require("./room"));
const booking_1 = __importDefault(require("./booking"));
const sequelize = new sequelize_1.Sequelize('fibooking_development', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
});
exports.sequelize = sequelize;
const Hotel = (0, hotel_1.default)(sequelize, sequelize_1.DataTypes);
const Room = (0, room_1.default)(sequelize, sequelize_1.DataTypes);
const Booking = (0, booking_1.default)(sequelize, sequelize_1.DataTypes);
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
exports.default = models;
//# sourceMappingURL=index.js.map