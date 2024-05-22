interface LoginRes {
    token: string
}

async function postAdminLogin(data: {
    email: string,
    password: string
}) {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/admin-login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        return (await res.json()) as LoginRes;
    } else {
        throw Error('Login failed!!!');
    }
}

export default postAdminLogin;