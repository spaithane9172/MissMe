import ThemeButton from "../ThemeButton";
import logo from "../../assets/logo.png";
import Modal from "../utils/Modal";
import { useState } from "react";
const Navbar = () => {
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const updateProfile = () => {
    console.log("update profile");
  };
  return (
    <nav className="fixed w-[100vw] h-[8vh] lg:h-[10vh] flex justify-between items-center bg-rose-600 px-[1rem] z-50">
      <div>
        <img
          src={logo}
          alt=""
          className="w-[7rem] h-[7rem] lg:w-[10rem] lg:h-[10rem]"
        />
      </div>
      <div className="flex">
        <ThemeButton />
        <button
          onClick={() => {
            setShowProfileDetails(!showProfileDetails);
          }}
          className="ml-[1rem] w-[2rem] h-[2rem] flex justify-center items-center text-white border-white border-[1px] shadow-lg rounded-full cursor-pointer"
        >
          <i className="fa-solid fa-user"></i>
        </button>
      </div>
      <Modal
        onClose={() => {
          setShowProfileDetails(!showProfileDetails);
        }}
        isOpen={showProfileDetails}
      >
        <div className="bg-white rounded-md shadow-lg">
          <h1 className="text-center font-semibold text-[1.2rem] pt-[0.5rem]">
            Profile
          </h1>
          <div className="flex flex-col w-[80vw] lg:w-[40vw] px-[1rem] py-[1rem]">
            <input
              type="text"
              className="border-[1px] border-rose-600  py-[0.5rem] lg:py-[0.7rem] px-[0.5rem] my-[0.3rem] lg:my-[0.5rem] outline-none rounded-md shadow-lg focus:shadow-rose-300 placeholder:text-[0.9rem] lg:placeholder:text-[1rem]"
            />
            <input
              type="text"
              className="border-[1px] border-rose-600  py-[0.5rem] lg:py-[0.7rem] px-[0.5rem] my-[0.3rem] lg:my-[0.5rem] outline-none rounded-md shadow-lg focus:shadow-rose-300 placeholder:text-[0.9rem] lg:placeholder:text-[1rem]"
            />
            <input
              type="email"
              className="border-[1px] border-rose-600  py-[0.5rem] lg:py-[0.7rem] px-[0.5rem] my-[0.3rem] lg:my-[0.5rem] outline-none rounded-md shadow-lg focus:shadow-rose-300 placeholder:text-[0.9rem] lg:placeholder:text-[1rem]"
            />
            <button className="bg-rose-600 text-white mt-[0.8rem] lg:mt-[1rem] py-[0.5rem] lg:py-[0.7rem] px-[0.5rem] w-full rounded-md shadow-lg cursor-pointer">
              Update
            </button>
          </div>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
