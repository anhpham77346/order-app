export interface GetOrderRes {
    itemId: number;
    id: number;
    quantity: number;
    unitPrice: number;
    orderId: number;
}

async function getOrder({ stringCode }: {
    stringCode: string;
}) {
    const userDataString = localStorage.getItem(`${import.meta.env.VITE_APP_API_URL}-user`);

    if (!userDataString) {
        console.error('Không tìm thấy dữ liệu.');
        return;
    }

    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/order?stringCode=${stringCode}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

    if (res.ok) {
        return (await res.json()) as GetOrderRes[];
    } else {
        throw Error('Failed!!!');
    }
}

export default getOrder;