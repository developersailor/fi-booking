// models/User.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize'; // Sequelize bağlantısını burada içe aktarıyoruz

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User', // Model adını burada belirtiyoruz
    tableName: 'users', // Veritabanındaki tablo adını belirtiyoruz (varsayılan olarak 'users')
  }
);

export default User;