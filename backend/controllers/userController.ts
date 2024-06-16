// controllers/userController.ts

import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import { Prisma, PrismaClient } from '@prisma/client'; // Import the User class
const prisma = new PrismaClient();

// Kayıt işlemi
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı oluştur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Kullanıcı oluşturulurken bir hata oluştu' });
  }
};

// Giriş işlemi
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    // Kullanıcı yoksa hata dön
    if (!user) {
      res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      return;
    }

    // Şifre eşleşmiyorsa hata dön
    if (!await bcrypt.compare(password, user.password)) {
      res.status(401).json({ message: 'Hatalı şifre' });
      return;
    }

    // Kullanıcı adı ve şifre doğruysa giriş başarılı dön
    res.status(200).json({ message: 'Giriş başarılı' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Giriş yapılırken bir hata oluştu' });
  }

};

// Çıkış işlemi (bu örnekte basit bir çıkış işlemidir)
export const logout = async (req: Request, res: Response): Promise<void> => {
  // logout işlemi
  res.status(200).json({ message: 'Çıkış yapıldı' });
};