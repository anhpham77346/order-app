import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import postCreateTable from "../api/table/postCreateTable";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { routes } from "../routes";

function AddTableTemplate() {
    const navigate = useNavigate();
    const [itemName, setItemName] = useState("");
    const [seatingCapacity, setSeatingCapacity] = useState("");

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Kiểm tra xem các giá trị state có tồn tại và không rỗng không
        if (!itemName || !seatingCapacity) {
            console.error('Vui lòng điền đầy đủ thông tin.');
            return; // Nếu có ít nhất một giá trị state rỗng, return khỏi hàm onSubmit()
        }

        // Kiểm tra xem seatingCapacity có phải là số nguyên không
        if (!Number.isInteger(Number(seatingCapacity))) {
            console.error('seatingCapacity phải là một số nguyên.');
            return; // Nếu không phải, return khỏi hàm onSubmit()
        }

        await postCreateTable({
            name: itemName,
            seatingCapacity: Number(seatingCapacity)
        });

        navigate(routes.table);
    }

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="flex items-center gap-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                <Link to={routes.home}>
                    <div className="cursor-pointer flex items-center gap-2">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z" stroke="#1C274C" strokeWidth="1.5"></path> <path d="M15 18H9" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                        <span>Trang chủ</span>
                    </div>
                </Link>
            </div>

            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" ></div>
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Thêm bàn ăn</h2>
                {/* <p className="mt-2 text-lg leading-8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p> */}
            </div>

            <form onSubmit={onSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">Tên bàn</label>
                        <div className="mt-2.5">
                            <Input type={"text"} onChange={(e: ChangeEvent<HTMLInputElement>) => setItemName(e.target.value)}></Input>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">Số chỗ ngồi</label>
                        <div className="mt-2.5">
                            <Input type={"text"} onChange={(e: ChangeEvent<HTMLInputElement>) => setSeatingCapacity(e.target.value)}></Input>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <Button typeBtn={"primary"} type={"submit"} className="w-full py-2.5">Thêm</Button>
                </div>
            </form>
        </div>
    );
};

export default AddTableTemplate;