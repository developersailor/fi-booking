"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
function default_1(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED, // you can omit the `DataTypes.` if you import them at the top
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
    }, {
        tableName: 'users',
        sequelize, // passing the `sequelize` instance is required
    });
    return User;
}
exports.default = default_1;
//# sourceMappingURL=user.js.map