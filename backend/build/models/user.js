"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static associate(models) {
        User.hasMany(models.Post, {
            foreignKey: 'userId',
            as: 'posts'
        });
        User.hasMany(models.Booking, {
            foreignKey: 'userId',
            as: 'bookings'
        });
    }
}
exports.default = (sequelize) => {
    User.init({
        username: sequelize_1.DataTypes.STRING,
        password: sequelize_1.DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
//# sourceMappingURL=user.js.map