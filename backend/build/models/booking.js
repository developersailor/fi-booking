"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, types) => {
    class Booking extends sequelize_1.Model {
        static associate(models) {
            Booking.belongsTo(models.User, {
                foreignKey: 'userId',
            });
            Booking.belongsTo(models.Hotel, {
                foreignKey: 'hotelId',
            });
            Booking.belongsTo(models.Room, {
                foreignKey: 'roomId',
            }), {
                sequelize,
                tableName: 'booking',
            };
        }
    }
    Booking.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        hotelId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        roomId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        checkInDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        checkOutDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'bookings',
    });
    return Booking;
};
//# sourceMappingURL=booking.js.map