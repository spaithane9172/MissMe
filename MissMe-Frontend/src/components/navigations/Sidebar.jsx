import Avatar from "boring-avatars";
import chatPreviewData from "../../data/userData";
const Sidebar = ({ setUserDetails }) => {
  const lastMessage = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const isToday = now.toDateString() === messageDate.toDateString();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = yesterday.toDateString() === messageDate.toDateString();
    if (isToday) {
      return date.slice(11, 16);
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      return date.slice(0, 10);
    }
    console.log(isToday);
    return isToday;
  };
  return (
    <div className="h-[92vh] lg:h-[90vh]">
      <div className="px-[1rem] py-[0.5rem] ">
        <h1 className="text-[1.2rem] font-semibold">Chats</h1>
      </div>
      <div className="flex items-center border-[1px] border-gray-30 mx-[1rem] my-[0.5rem] rounded-md shadow-md">
        <input
          type="text"
          className="w-full outline-none px-[0.5rem] py-[0.2rem] "
          placeholder="Search..."
        />
        <i className="fa-solid fa-magnifying-glass mx-[0.5rem]"></i>
      </div>
      <div>
        {chatPreviewData.map((data) => {
          return (
            <div
              className="flex justify-between hover:bg-rose-400 py-[0.5rem]"
              onClick={() => {
                setUserDetails(data);
              }}
            >
              <div className="w-1/4 flex justify-center items-center">
                <div className="w-fit border-[1px] border-white rounded-full shadow-lg">
                  <Avatar
                    size={45}
                    name={data.name}
                    variant="beam"
                    colors={["#F43F5E", "#F9A8D4", "#FDE68A"]}
                  />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="">
                  <h1 className="font-semibold">{data.name}</h1>
                  <p className="text-[0.8rem]">
                    {data.lastMessage.length > 35
                      ? data.lastMessage.slice(0, 35) + "..."
                      : data.lastMessage}
                  </p>
                </div>
                <div className="w-1/4 flex flex-col justify-center items-center">
                  <h1 className="text-[0.8rem]">{lastMessage(data.date)}</h1>
                  {data.unreadCount != 0 && (
                    <div className="bg-rose-600 text-white w-[1.5rem] h-[1.5rem] p-[0.4rem] flex justify-center items-center text-[0.8rem]  rounded-full">
                      {data.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
