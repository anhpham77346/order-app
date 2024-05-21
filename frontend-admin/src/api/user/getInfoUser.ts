export interface InfoRes {
    id: number;
    fullName: string;
    email: string;
    role: "USER" | "ADMIN";
    phoneNumber: string;
    createdAt: string;
    deletedAt: string;
}

async function getInfoUser() {
    const userDataString = localStorage.getItem(`${import.meta.env.VITE_APP_URL}-user`);

    if (!userDataString) {
        console.error('Không tìm thấy dữ liệu.');
        return;
    }

    const userData = JSON.parse(userDataString);
    const token = userData.token;

    const res = await fetch(`${import.meta.env.VITE_APP_URL}/api/user/info`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });

    if (res.ok) {
        return (await res.json()) as {
            data: InfoRes
        };
    } else {
        throw Error('Login failed!!!');
    }
}

export default getInfoUser;