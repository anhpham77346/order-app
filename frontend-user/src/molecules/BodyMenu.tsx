import { GetAllItemRes } from "../api/item/getAllItem";
import Item from "./Item";

function BodyMenu({ data }: { data: GetAllItemRes[] }) {
    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-3">
            <div className="flex justify-between items-center ">
                <div>
                    <p className="font-semibold text-[20px]">Menu</p>
                </div>
            </div>

            {data.map(i => (
                <Item key={i.id} data={i}></Item>
            ))}
        </div>
    );
};

export default BodyMenu;