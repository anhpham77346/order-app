import { Response } from 'express';
import { Request } from '../../app';

async function getInfoUser(req: Request, res: Response) {
    try {
        const user = req.user;

        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong!!!' });
    }
}

export default getInfoUser;
