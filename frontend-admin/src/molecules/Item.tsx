import { GetAllItemRes } from "../api/item/getAllItem";

function Item({ data }: { data: GetAllItemRes }) {
    return (
        <div className="border-2 border-gray-300 w-full my-3 rounded-xl flex items-center">
            <div className="flex-1 flex gap-3 px-3">
                <div className="flex justify-center items-center">
                    <img src={`${import.meta.env.VITE_APP_API_FILE}${data.imgLink}`} alt="" className="object-cover rounded-md h-[80px] w-[80px]" />
                </div>
                <div className="flex-1 flex items-center">
                    <div>
                        <p className="font-medium break-all text-[20px]">{data.name}</p>
                        <p className="font-medium break-all">{data.description}</p>
                    </div>
                </div>
            </div>
            <div className="flex px-3">
                <div>
                    <p className="font-bold w-[100px]">{data.price.toLocaleString('vi-VN')} VND</p>
                </div>
                <div className="flex gap-4">
                    <svg className="cursor-pointer icon" width="25px" height="25px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCa#CCCCCC#CCCCCCie#CCCCCC" ></g><g id="SVGRepo_t#CCCCCCace#CCCCCCCa#CCCCCC#CCCCCCie#CCCCCC"  ></g><g id="SVGRepo_iconCa#CCCCCC#CCCCCCie#CCCCCC"><path d="M667.8 362.1H304V830c0 28.2 23 51 51.3 51h312.4c28.4 0 51.4-22.8 51.4-51V362.2h-51.3z" fill="#CCCCCC"></path><path d="M750.3 295.2c0-8.9-7.6-16.1-17-16.1H289.9c-9.4 0-17 7.2-17 16.1v50.9c0 8.9 7.6 16.1 17 16.1h443.4c9.4 0 17-7.2 17-16.1v-50.9z" fill="#CCCCCC"></path><path d="M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c0.1-20.2-16.9-36.8-37.7-36.8z m-293.5-41.5h145.3v41.5H439.8v-41.5z m-146.2 83.1H729.5v41.5H293.6v-41.5z m404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z" fill="red"></path><path d="M511.6 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.4 9.3 20.7 20.8 20.7zM407.8 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0.1 11.4 9.4 20.7 20.8 20.7zM615.4 799.6c11.5 0 20.8-9.3 20.8-20.8V467.4c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.5 9.3 20.8 20.8 20.8z" fill="red"></path></g></svg>
                </div>
            </div>
        </div>
    );
};

export default Item;