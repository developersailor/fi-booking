"use strict";
// models/User.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize")); // Sequelize bağlantısını burada içe aktarıyoruz
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'User', // Model adını burada belirtiyoruz
    tableName: 'users', // Veritabanındaki tablo adını belirtiyoruz (varsayılan olarak 'users')
});
exports.default = User;
//# sourceMappingURL=user.js.map