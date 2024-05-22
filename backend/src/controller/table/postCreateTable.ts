import { Response } from 'express';
import { prisma, Request } from '../../app';

interface ReqType {
    name: string;
    seatingCapacity: number;
}

async function postCreateTable(req: Request, res: Response) {
    try {
        const bodyData = req.body as ReqType;

        // Tạo mới table
        const newTable = await prisma.table.create({
            data: {
                name: bodyData.name,
                seatingCapacity: bodyData.seatingCapacity,
                isActive: false
            },
        });

        res.status(200).json({ message: 'thanh cong' });
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong!!!' });
    }
}

export default postCreateTable;
