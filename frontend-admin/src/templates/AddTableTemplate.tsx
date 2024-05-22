import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import Input from "../atoms/Input";
import Textarea from "../atoms/Textarea";
import Button from "../atoms/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import postCreateItem from "../api/item/postCreateItem";
import Select from "../atoms/Slect";

// Khai báo enum ItemCategory
enum ItemCategory {
    DESSERT = "Tráng miệng",
    MAIN_COURSE = "Món chính",
    APPETIZER = "Món khai vị",
    BEVERAGE = "Đồ uống",
    SNACK = "Đồ ăn vặt"
}

function AddTableTemplate() {
    const navigate = useNavigate();
    const [file, setFile] = useState<string | undefined>(undefined); // Save base64 string of image
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemCategory, setItemCategory] = useState<"DESSERT" | "MAIN_COURSE" | "APPETIZER" | "BEVERAGE" | "SNACK">("DESSERT");
    const [itemDescription, setItemDescription] = useState("");
    const [itemAvailability, setItemAvailability] = useState(false);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Kiểm tra xem các giá trị state có tồn tại và không rỗng không
        if (!itemName || !itemPrice || !itemDescription) {
            console.error('Vui lòng điền đầy đủ thông tin.');
            return; // Nếu có ít nhất một giá trị state rỗng, return khỏi hàm onSubmit()
        }

        // Kiểm tra xem itemPrice có phải là số nguyên không
        if (!Number.isInteger(Number(itemPrice))) {
            console.error('itemPrice phải là một số nguyên.');
            return; // Nếu không phải, return khỏi hàm onSubmit()
        }

        await postCreateItem({
            name: itemName,
            description: itemDescription,
            price: Number(itemPrice),
            category: itemCategory as "DESSERT" | "MAIN_COURSE" | "APPETIZER" | "BEVERAGE" | "SNACK",
            availability: itemAvailability,
            imgBase64: file
        });

        navigate(routes.menu);
    }

    /**
     * Xử lý mã hoá file thành dạng base64
     */
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(reader.result as string);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

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
                            <Input type={"text"} onChange={(e: ChangeEvent<HTMLInputElement>) => setItemPrice(e.target.value)}></Input>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">Loại món ăn</label>
                        <div className="mt-2.5">
                            {/* Trường select với các lựa chọn từ enum ItemCategory */}
                            <Select onChange={(event: ChangeEvent<HTMLSelectElement>) => { setItemCategory(event.target.value as "DESSERT" | "MAIN_COURSE" | "APPETIZER" | "BEVERAGE" | "SNACK"); }}
                                className="bg-white w-full">
                                {Object.values(ItemCategory).map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Mô tả</label>
                        <div className="mt-2.5">
                            <Textarea onChange={(e: ChangeEvent<HTMLInputElement>) => setItemDescription(e.target.value)}></Textarea>
                        </div>
                    </div>
                    <div>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div className="flex gap-x-2 sm:col-span-2">
                        <label htmlFor="item" className="flex gap-x-2">
                            <div className="flex h-6 items-center">
                                <input id="item" type="checkbox" onChange={(e: ChangeEvent<HTMLInputElement>) => setItemAvailability(e.target.checked)} />
                            </div>
                            <div className="text-sm leading-6 text-gray-600">
                                Còn hàng
                            </div>
                        </label>
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