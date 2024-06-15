import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  username: string;
  password: string;
}

class User extends Model<UserAttributes> {
  public username!: string;
  public password!: string;

  public static associate(models: any): void {
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

export default (sequelize: Sequelize) => {
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};