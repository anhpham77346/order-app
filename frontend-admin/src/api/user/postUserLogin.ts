interface LoginRes {
    token: string
}

async function postUserLogin(data: {
    email: string,
    password: string
}) {
    const res = await fetch('http://localhost:3000/api/user/login', {
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

export default postUserLogin;