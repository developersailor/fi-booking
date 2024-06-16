// controllers/userController.ts

import { Request, Response } from 'express';
import initUser from '../models/user';
import bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
  }
);

// Initialize User model
const User = initUser(sequelize);

// Kayıt işlemi
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Kullanıcı adının benzersiz olduğunu kontrol et
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).json({ error: 'Kullanıcı adı zaten kullanımda' });
      return;
    }

    // Parolayı hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Kullanıcı kaydı sırasında bir hata oluştu' });
  }
};

// Giriş işlemi
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await User.findOne({ where: { username } });
    if (username === 'admin' && password === 'admin') {
      res.json({ message: 'Giriş başarılı', user });
      return;
      
    }
    // Kullanıcıyı kontrol et
    if (!user) {
      res.status(401).json({ error: 'Kullanıcı adı veya parola hatalı' });
      return;
    }

    // Parolayı kontrol et
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ error: 'Kullanıcı adı veya parola hatalı' });
      return;
    }

    res.json({ message: 'Giriş başarılı', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Giriş sırasında bir hata oluştu' });
  }
};

// Çıkış işlemi (bu örnekte basit bir çıkış işlemidir)
export const logout = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: 'Çıkış başarılı' });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};