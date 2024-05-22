import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import postUserRegister from "../api/user/postUserRegister";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";

function RegisterTemplate() {
    const navigate = useNavigate();
    // Form data state
    const [formData, setFormData] = useState<{
        fullName: string,
        email: string,
        phoneNumber: string,
        password: string,
        passwordAg: string
    }>({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordAg: ''
    });
    // State to track password matching
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
    const [isAnyFieldEmpty, setIsAnyFieldEmpty] = useState<boolean>(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Check if any field is empty after trimming
        if (Object.values(formData).some(value => value.trim() === '')) {
            setIsAnyFieldEmpty(true);
            return;
        } else {
            setIsAnyFieldEmpty(false);
        }

        // Check if passwords match
        if (formData.password !== formData.passwordAg) {
            setPasswordMatch(false);
            return; // Stop further execution
        } else {
            setPasswordMatch(true);
        }

        await postUserRegister({
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            role: 'ADMIN',
            password: formData.password
        });

        navigate(routes.login);
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex items-center gap-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                <Link to={routes.home}>
                    <div className="flex items-center gap-2">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z" stroke="#1C274C" strokeWidth="1.5"></path> <path d="M15 18H9" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                        <span>Trang chủ</span>
                    </div>
                </Link>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="h-20 mx-auto" src="/icon.png" alt="" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Đăng ký</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Họ và tên</label>
                        <div className="mt-2">
                            <Input
                                type="text"
                                placeholder="Họ và tên"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Địa chỉ email</label>
                        <div className="mt-2">
                            <Input
                                type="email"
                                placeholder="Địa chỉ email"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Số điện thoại</label>
                        <div className="mt-2">
                            <Input
                                type="text"
                                placeholder="Số điện thoại"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Mật khẩu</label>
                        </div>
                        <div className="mt-2">
                            <Input
                                type="password"
                                placeholder="Mật khẩu"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Nhập lại mật khẩu</label>
                        </div>
                        <div className="mt-2">
                            <Input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, passwordAg: e.target.value })}
                            />
                        </div>
                    </div>

                    {!isAnyFieldEmpty ? null : <p className="text-red-500 text-xs">Vui lòng điền đầy đủ các trường còn trống</p>}
                    {passwordMatch ? null : <p className="text-red-500 text-xs">Mật khẩu nhập lại không trùng nhau</p>}

                    <div>
                        <Button typeBtn="primary" type="submit" className="w-full">
                            Đăng nhập
                        </Button>
                    </div>
                </form>
                <Link to={routes.login}>
                    <div className="mt-10 text-center text-sm text-gray-500">
                        Bạn đã có tài khoản?
                        <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Đăng nhập</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default RegisterTemplate;