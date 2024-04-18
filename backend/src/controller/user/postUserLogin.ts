import { Request, Response } from 'express';

async function postUserLogin(req: Request, res: Response) {
    try {
        res.send('ok');
    } catch (error) {
        res.status(500).json({ message: 'loi cmnr' });
    }
}

export default postUserLogin;
