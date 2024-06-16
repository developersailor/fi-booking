import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { sequelize } from './index'; // Assuming you have a sequelize instance here

interface HotelAttributes {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  amenities: string[];
  rating: number;
  reviews: number;
  images: string[];
  city: string;
  country: string;
  price: number;
}

interface HotelCreationAttributes extends Optional<HotelAttributes, 'id'> {}

export default (sequelize: Sequelize, types: typeof DataTypes) => {
  class Hotel extends Model<HotelAttributes, HotelCreationAttributes> implements HotelAttributes {
    public id!: number;
    public name!: string;
    public location!: string;
    public pricePerNight!: number;
    public guests!: number;
    public bedrooms!: number;
    public bathrooms!: number;
    public description!: string;
    public amenities!: string[];
    public rating!: number;
    public reviews!: number;
    public images!: string[];
    public city!: string;
    public country!: string;
    public price!: number;
    
    static associate(models: any) {
      Hotel.hasMany(models.Room, {
        foreignKey: 'hotelId',
      });
    } 
    
  }
  

  // Initialize the model with the table definition and options
  Hotel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pricePerNight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amenities: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      reviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price:{
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    },
    {
      sequelize, // Connect the model to your Sequelize instance
      tableName: 'hotels',
    }
  );
  
  return Hotel;
  
}