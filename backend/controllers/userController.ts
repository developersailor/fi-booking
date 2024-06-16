// controllers/userController.ts

import { Request, Response } from 'express';
import User from '../models/user';

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

    // Yeni kullanıcı oluştur
    const newUser = await User.create({ username, password });

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

    // Kullanıcıyı kontrol et
    if (!user || user.password !== password) {
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