import { useEffect, useRef, useState } from "react";

import Avatar from "boring-avatars";
import logo from "../assets/logoForPage.png";
const Chats = ({ userDetails, setUserDetails }) => {
  console.log("user", userDetails);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef();
  useEffect(() => {
    if (!showDropDown) {
      return;
    }
    const handleOutSideClick = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [showDropDown]);
  return (
    <div className="w-full ">
      {userDetails ? (
        <div className="w-full ">
          <div className="bg-rose-600/30 flex justify-between items-center px-[1rem] lg:px-[2rem] py-[0.5rem] shadow-b-lg">
            <div className="flex items-center">
              <button
                className="lg:hidden"
                onClick={() => {
                  setUserDetails();
                }}
              >
                <i className="fa-solid fa-arrow-left text-[1.2rem] font-semibold  pr-[1rem]"></i>
              </button>
              <div className="w-fit border-[1px] border-white rounded-full shadow-lg">
                <Avatar
                  size={45}
                  name={userDetails.name}
                  variant="beam"
                  colors={["#F43F5E", "#F9A8D4", "#FDE68A"]}
                />
              </div>
              <div className="mx-[1rem]">
                <p className="font-semibold text-[1.1rem]">
                  {userDetails.name}
                </p>
              </div>
            </div>
            <div>
              <i
                onClick={() => {
                  setShowDropDown(true);
                }}
                className="hover:cursor-pointer fa-solid fa-ellipsis-vertical font-semibold text-[1.3rem] px-[1rem] py-[0.5rem]"
              ></i>
              <div className="relative">
                {showDropDown && (
                  <div
                    ref={dropDownRef}
                    className="absolute right-0 bg-white border-[1px] border-gray-300 rounded-md shadow-lg"
                  >
                    <ul className="w-[10rem]">
                      <li className="px-[1rem] pt-[0.4rem] pb-[0.2rem] hover:bg-gray-200 hover:cursor-pointer rounded-t-md font-semibold">
                        Block
                      </li>
                      <li className="px-[1rem] py-[0.2rem] hover:bg-gray-200 hover:cursor-pointer font-semibold">
                        Unfriend
                      </li>
                      <li className="px-[1rem] pt-[0.2rem] py-[0.4rem] hover:bg-gray-200 hover:cursor-pointer rounded-b-md font-semibold">
                        Delete All Chat
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-[2rem]">
            <div className="flex justify-center mt-[1rem]">
              <div className="bg-gray-300 w-fit px-[1rem] py-[0.2rem] rounded-md">
                <p className="text-[0.9rem]">06/07/2025</p>
              </div>
            </div>
            <div className="">
              <p className="text-[0.9rem] lg:text-[1rem] px-[0.5rem] py-[0.2rem] rounded-sm w-fit bg-gradient-to-r from-rose-600 to-rose-500 text-white">
                Hey! 👋
              </p>
            </div>
            <div className="flex justify-end">
              <p className="text-[0.9rem] lg:text-[1rem] my-[0.3rem] px-[0.5rem] py-[0.2rem] rounded-sm w-fit bg-gradient-to-r from-rose-600 to-rose-500 text-white">
                Hello! How's it going?
              </p>
            </div>
          </div>
          <div className="absolute w-[100vw] lg:w-[74vw] bottom-0 px-[1rem] lg:px-[2rem] py-[1rem] ">
            <div className="flex">
              <input
                placeholder="Message ..."
                type="text"
                className="flex w-full px-[0.5rem] py-[0.5rem] border-[1px] border-rose-600 rounded-full outline-none rounded-l-full"
              />
              <button className="bg-rose-600 text-white min-w-10 min-h-10 w-10 h-10 ml-2 rounded-full flex items-center justify-center text-base">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[92vh] lg:h-[90vh]">
          <img
            src={logo}
            alt=""
            className="invert opacity-50 w-[10rem] h-[4rem]"
          />
          <h1 className="font-semibold text-[1.2rem]">Wellcome to MissMe</h1>
          <p>Select a user from the list to start your private conversation.</p>
        </div>
      )}
    </div>
  );
};

export default Chats;
