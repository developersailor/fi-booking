"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, types) => {
    class Hotel extends sequelize_1.Model {
        static associate(models) {
            Hotel.hasMany(models.Room, {
                foreignKey: 'hotelId',
            });
        }
    }
    // Initialize the model with the table definition and options
    Hotel.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        pricePerNight: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        guests: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        bedrooms: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        bathrooms: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        amenities: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false,
        },
        rating: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        reviews: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        images: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false,
        },
        city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        }
    }, {
        sequelize, // Connect the model to your Sequelize instance
        tableName: 'hotels',
    });
    return Hotel;
};
//# sourceMappingURL=hotel.js.map