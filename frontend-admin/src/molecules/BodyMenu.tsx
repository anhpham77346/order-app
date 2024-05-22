import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import { routes } from "../routes";
import Item from "./Item";
import { GetAllItemRes } from "../api/item/getAllItem";

function BodyMenu({ data }: { data: GetAllItemRes[] }) {
    const navigate = useNavigate();

    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-3">
            <div className="flex justify-between items-center ">
                <div>
                    <p className="font-semibold text-[20px]">Món ăn</p>
                    <p>Các loại món ăn</p>
                </div>
                <Button onClick={() => { navigate(routes.addItem) }} typeBtn={"primary"} type={"button"}>Thêm</Button>
            </div>

            {data.map(i => (
                <Item key={i.id} data={i}></Item>
            ))}
        </div>
    );
};

export default BodyMenu;