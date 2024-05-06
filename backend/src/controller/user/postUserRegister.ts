import { Request, Response } from 'express';
import { prisma } from '../../app';
import bcrypt from 'bcrypt'; 

type UserReq = {
    fullName: string;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN';
    phoneNumber: string;
}

async function postUserRegister(req: Request, res: Response) {
    try {
        const data = req.body as UserReq;

        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: hashedPassword,
                role: data.role,
                phoneNumber: data.phoneNumber
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
                phoneNumber: true,
                createdAt: true,
                deletedAt: true,
            }
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong!!!' });
    }
}

export default postUserRegister;
