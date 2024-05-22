interface UserRes {
    id: number;
    fullName: string;
    email: string;
    role: 'USER' | 'ADMIN';
    phoneNumber: string;
    createdAt: string;
    deletedAt: string | null;
}

async function postUserRegister(data: {
    fullName: string;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN';
    phoneNumber: string;
}) {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        return (await res.json()) as UserRes;
    } else {
        throw Error('Login failed!!!');
    }
}

export default postUserRegister;