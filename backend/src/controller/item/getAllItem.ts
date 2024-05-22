import { Response } from 'express';
import { prisma, Request } from '../../app';

async function getAllItem(req: Request, res: Response) {
    try {
        const items = await prisma.item.findMany({
            where: {
                deletedAt: null
            }
        });
        
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong!!!' });
    }
}

export default getAllItem;
