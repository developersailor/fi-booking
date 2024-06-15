"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, types) => {
    class Booking extends sequelize_1.Model {
        static associate(models) {
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
    Booking.init({
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
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
        hotelId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        roomId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};
//# sourceMappingURL=booking.js.map