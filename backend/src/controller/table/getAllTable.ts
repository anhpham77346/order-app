import { Response } from 'express';
import { prisma, Request } from '../../app';

async function getAllTable(req: Request, res: Response) {
    try {
        const tables = await prisma.table.findMany({
            where: {
                deletedAt: null
            }
        });
        
        res.json(tables);
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export default getAllTable;
