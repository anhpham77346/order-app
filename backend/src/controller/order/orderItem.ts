import { Response } from 'express';
import { prisma, Request } from '../../app';

interface DataReq {
    stringCode: string;
    itemId: number;
}

async function orderItem(req: Request, res: Response) {
    try {
        const { stringCode, itemId } = req.body as DataReq;

        const t = await prisma.table.findUnique({
            where: {
                stringCode: stringCode
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

        const item = await prisma.orderItem.findUnique({
            where: {
                itemId_orderId: {
                    itemId,
                    orderId: t?.orders[0].id ?? 0
                }
            }
        });

        const newOrderItem = await prisma.orderItem.create({
            data: {
                quantity: item!.quantity,
                unitPrice: item!.unitPrice,
                item: { connect: { id: itemId } },
                order: { connect: { id: t?.orders[0].id } },
            },
            select: {
                id: true,
                itemId: true,
                orderId: true,
                quantity: true,
                unitPrice: true,
            }
        });

        res.json({ newOrderItem: newOrderItem });
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export default orderItem;
