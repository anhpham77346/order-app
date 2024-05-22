import { useEffect, useState } from "react";
import BodyMenu from "../molecules/BodyMenu";
import Sidebar from "../organisms/Sidebar";
import getInfoUser, { InfoRes } from "../api/user/getInfoUser";
import getAllItem, { GetAllItemRes } from "../api/item/getAllItem";
import getAllTable, { GetAllTableRes } from "../api/item/getAllTable";
import BodyTable from "../molecules/BodyTable";

interface HomeTemplateProps {
    type: 'menu' | 'home' | 'table';
}

function HomeTemplate({ type }: HomeTemplateProps) {
    const [user, setUser] = useState<InfoRes>();
    const [items, setItems] = useState<GetAllItemRes[]>([]);
    const [tables, setTables] = useState<GetAllTableRes[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy thông tin user
                const userData = await getInfoUser();
                setUser(userData?.data);

                // Lấy tất cả menu ra
                const itemsData = await getAllItem();
                setItems(itemsData ?? []);

                // Lấy tất cả table ra
                const tablesData = await getAllTable();
                setTables(tablesData ?? []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <div className="h-[80px] shadow-md w-full flex justify-end items-center px-6">
                    <div className="flex justify-between gap-2">
                        <div>
                            <p className="font-medium">Hello</p>
                            <p className="text-gray-500">{user?.fullName ?? ''}</p>
                        </div>
                        <div className="flex items-center">
                            {/* <svg className="hidden fill-current sm:block" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z" fill=""></path>
                            </svg> */}
                        </div>
                    </div>
                </div >

                {type === 'menu' && <BodyMenu data={items} />}
                {type === 'table' && <BodyTable />}
            </div>
        </div>
    );
};

export default HomeTemplate;