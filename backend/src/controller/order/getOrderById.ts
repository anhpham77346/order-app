import { Response } from 'express';
import { prisma, Request } from '../../app';

async function getOrderById(req: Request, res: Response) {
    try {
        const { id } = req.query;

        const t = await prisma.table.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                orders: {
                    select: {
                        id: true
                    },
                    orderBy: {
                        id: 'desc'
                    },
                    take: 1
                }
            }
        });

        const list = await prisma.orderItem.findMany({
            where: {
                orderId: t?.orders[0].id
            },
            select: {
                id: true,
                itemId: true,
                orderId: true,
                quantity: true,
                unitPrice: true,
            }
        });

        res.json(list);
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export default getOrderById;
