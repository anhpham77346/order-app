import { Request, Response } from 'express';
import { prisma } from '../../app';
import bcrypt from 'bcryptjs'; 

type UserReq = {
    fullName: string;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN' | 'SUPERADMIN';
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
            }
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'loi cmnr' });
    }
}

export default postUserRegister;
