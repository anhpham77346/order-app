import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../app';
import bcrypt from 'bcrypt';

type LoginReq = {
    email: string;
    password: string;
}

export type DataToken = {
    id: number,
    fullName: string,
    email: string,
    role: 'USER' | 'ADMIN',
    phoneNumber: string,
    createdAt: string,
    deletedAt: string
}

async function postUserLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body as LoginReq;

        // Tìm user trong mock database
        const user = await prisma.user.findUnique({ where: { email: email } });

        if (user && process.env.SECRET_KEY) {
            // Check password correct hay không
            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Username or password is incorrect' });
            }

            // Nếu user tồn tại, tạo JWT token và gửi lại cho client
            const token = jwt.sign({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                createdAt: user.createdAt,
                deletedAt: user.deletedAt
            }, process.env.SECRET_KEY);

            res.json({ token: token });

            return;
        }

        res.status(401).json({ message: 'Username or password is incorrect' });
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong!!!' });
    }
}

export default postUserLogin;
