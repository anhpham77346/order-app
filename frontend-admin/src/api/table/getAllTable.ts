export interface GetAllTableRes {
    id: number;
    name: string;
    seatingCapacity: number;
    qrCode: string | null;
    stringCode: string | null;
    createdAt: string;
    deletedAt: string | null;
    isActive: boolean;
}

async function getAllTable() {
    const userDataString = localStorage.getItem(`${import.meta.env.VITE_APP_API_URL}-user`);

    if (!userDataString) {
        console.error('Không tìm thấy dữ liệu.');
        return;
    }

    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/table/all`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });

    if (res.ok) {
        return (await res.json()) as GetAllTableRes[];
    } else {
        throw Error('Failed!!!');
    }
}

export default getAllTable;