export interface OrderItemRes {
    itemId: number;
    id: number;
    quantity: number;
    unitPrice: number;
    orderId: number;
}

async function orderItem({ stringCode, itemId }: {
    stringCode: string;
    itemId: number;
}) {
    const userDataString = localStorage.getItem(`${import.meta.env.VITE_APP_API_URL}-user`);

    if (!userDataString) {
        console.error('Không tìm thấy dữ liệu.');
        return;
    }

    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/order/order`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stringCode: stringCode,
            itemId: itemId
        })
    });

    if (res.ok) {
        return (await res.json()) as OrderItemRes[];
    } else {
        throw Error('Failed!!!');
    }
}

export default orderItem;