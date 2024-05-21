import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import postUserLogin from "../api/user/postUserLogin";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { routes } from './../routes';

function LoginTemplate() {
    // Form data state
    const [formData, setFormData] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    });

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const res = await postUserLogin(formData);

        localStorage.setItem('user', JSON.stringify(res));
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex items-center gap-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z" stroke="#1C274C" strokeWidth="1.5"></path> <path d="M15 18H9" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                <Link to={routes.home}>Trang chủ</Link>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="h-20 mx-auto" src="/icon.png" alt="" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Đăng nhập</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={onSubmit}
                    className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Địa chỉ email</label>
                        <div className="mt-2">
                            <Input
                                type="email"
                                placeholder="Nhập email"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mật khẩu</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Quên mật khẩu?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <Input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <Button typeBtn="primary" type="submit" className="w-full">
                            Đăng nhập
                        </Button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Bạn chưa có tài khoản?
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Tạo tài khoản</a>
                </p>
            </div>
        </div>
    );
};

export default LoginTemplate;