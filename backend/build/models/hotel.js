"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, types) => {
    class Hotel extends sequelize_1.Model {
        static associate(models) {
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
    Hotel.init({
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        images: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Hotel',
    });
    return Hotel;
};
//# sourceMappingURL=hotel.js.map