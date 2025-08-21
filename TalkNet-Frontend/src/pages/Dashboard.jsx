import { useState } from "react";
import Sidebar from "../components/navigations/Sidebar";
import Chats from "../components/Chats";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState();

  return (
    <div className="flex">
      <div
        className={`${
          userDetails ? "hidden lg:block" : "block"
        } bg-rose-600/30 w-full lg:w-[35vw] overflow-hidden border-r-[1px] border-rose-500 `}
      >
        <Sidebar setUserDetails={setUserDetails} />
      </div>
      <div className={`w-full ${userDetails ? "block" : "hidden lg:block"}`}>
        <Chats userDetails={userDetails} setUserDetails={setUserDetails} />
      </div>
    </div>
  );
};

export default Dashboard;
