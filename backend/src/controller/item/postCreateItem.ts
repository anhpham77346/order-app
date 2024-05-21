import { Response } from 'express';
import { CustomReq } from '../../middleware/userMiddleware';
import { DataToken } from '../user/postUserLogin';

async function postCreateItem(req: CustomReq, res: Response) {
    try {
        const user = req.user as DataToken;

        res.status(200).json({ message: user });
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong!!!' });
    }
}

export default postCreateItem;
