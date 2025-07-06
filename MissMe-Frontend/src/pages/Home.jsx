import bgForMobile from "../assets/bgForMobile.png";
import bgForPC from "../assets/bgForPC.png";
import featureData from "../data/featureData";
import SlideShow from "../components/utils/Slider";
import testimonialsData from "../data/testimonialsData";
import { useContext, useState } from "react";
import { Context } from "../context/AppContext";
import Modal from "../components/utils/Modal";
import Form from "../components/utils/Form";
import { motion } from "framer-motion";

const Home = () => {
  const { mode } = useContext(Context);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const login = () => {
    console.log("login");
  };
  return (
    <div className="overflow-hidden">
      <Modal
        isOpen={loginModal}
        onClose={() => {
          setLoginModal(false);
        }}
      >
        <div className="bg-white mt-[1rem] px-[2rem] lg:px-[3rem] py-[1rem] rounded-md">
          <h1 className="text-[1.2rem] lg:text-[1.5rem] font-semibold text-center mb-[0.5rem] lg:mb-[1rem]">
            LogIn
          </h1>
          <Form
            button={{
              buttonName: "LogIn",
              buttonFunction: login,
            }}
            formDetails={[
              {
                name: "email",
                type: "email",
                placeholder: "Email",
              },
              {
                name: "password",
                type: "password",
                placeholder: "Password",
              },
            ]}
          />
          <div className="my-[1rem]">
            <p className="text-[0.9rem] lg:text-[1rem]">
              Don't Have an accout?{" "}
              <button
                onClick={() => {
                  setSignupModal(true);
                  setLoginModal(false);
                }}
                className="text-rose-600 cursor-pointer"
              >
                SignUp
              </button>
            </p>
            <p className="text-rose-600 text-[0.9rem] lg:text-[1rem] cursor-pointer">
              Forgotten password?
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={signupModal}
        onClose={() => {
          setSignupModal(false);
        }}
      >
        <div className="bg-white w-[80vw] lg:w-fit mt-[1rem] px-[1.5rem] lg:px-[3rem] py-[1rem] rounded-md">
          <h1 className="text-[1.5rem] font-semibold text-center mb-[0.5rem] lg:mb-[1rem]">
            SignUp
          </h1>
          <Form
            button={{
              buttonName: "LogIn",
              buttonFunction: login,
            }}
            formDetails={[
              {
                name: "firstName",
                type: "text",
                placeholder: "First Name",
              },
              {
                name: "lastName",
                type: "text",
                placeholder: "Last Name",
              },
              {
                name: "email",
                type: "email",
                placeholder: "Email",
              },
              {
                name: "password",
                type: "password",
                placeholder: "Password",
              },
              {
                name: "confirmPassword",
                type: "password",
                placeholder: " Confirm Password",
              },
            ]}
          />
          <p className="text-[0.9rem] lg:text-[1rem] my-[1rem]">
            Already Have an account?{" "}
            <button
              onClick={() => {
                setLoginModal(true);
                setSignupModal(false);
              }}
              className="text-rose-600 cursor-pointer"
            >
              LogIn
            </button>
          </p>
        </div>
      </Modal>
      <div className="flex justify-center items-center relative">
        <div className="w-full h-[70vh] lg:h-[90vh]">
          <div
            style={{
              background: `url(${bgForMobile})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="absolute w-[100vw] h-[70vh] lg:hidden "
          ></div>
          <div
            style={{
              background: `url(${bgForPC})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="absolute w-[100vw] h-[90vh] hidden lg:block"
          ></div>
          <div className="absolute bg-black opacity-50 w-[100vw] h-[70vh] lg:h-[90vh]"></div>

          <div className="z-[10] relative text-white flex flex-col justify-end h-[70vh] lg:h-[90vh] items-start pb-[10vh] lg:pb-[35vh]  px-[1rem] lg:px-[5rem]">
            <h1 className="text-[1.5rem] lg:text-[2rem]">
              Private Conversations. Real Connections.
            </h1>
            <p className="my-[1rem]">
              Send friend requests, chat safely, and never miss a moment.
            </p>
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: "easeInOut" }}
              onClick={() => {
                setLoginModal(true);
              }}
              className="bg-gradient-to-r from-rose-600 to-rose-500 px-[3rem] py-[0.5rem] rounded-lg shadow-lg/20 shadow-rose-200 cursor-pointer font-semibold"
            >
              LogIn
            </motion.button>
          </div>
        </div>
      </div>
      <div className="shadow-lg my-[1rem] py-[2rem]">
        <h1 className="text-center text-[2rem] text-rose-600 font-semibold">
          What You'll Love
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 my-[2rem] gap-x-3 lg:gap-x-6 gap-y-3 mx-[1rem] lg:mx-[2rem]">
          {featureData.map((data, indx) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, delay: indx / 10 }}
                key={data.title}
                className={`rounded-md flex flex-col justify-center border-[1px] border-rose-900 shadow-lg/30 shadow-rose-400 lg:px-[2.5rem] px-[1rem] py-[1.5rem] lg:py-[2.5rem] bg-white/90 `}
              >
                <div className="bg-gradient-to-r from-rose-600 to-rose-400 w-fit px-[0.7rem] lg:px-[1rem] py-[0.5rem] lg:py-[0.8rem] rounded-md flex justify-center items-center mb-[0.5rem]">
                  <i
                    className={`${data.icon} text-[1.5rem] lg:text-[2rem] text-white`}
                  ></i>
                </div>
                <h1
                  className={`font-semibold text-[0.9rem] lg:text-[1.5rem] text-black`}
                >
                  {data.title}
                </h1>
                <p className="text-[0.9rem] text-justify">{data.para}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="bg-gradient-to-r from-rose-600 to-rose-400 text-white mb-[1rem] px-[1rem] lg:px-[5rem] py-[3rem] flex flex-col lg:flex-row space-x-[2rem]">
        <div className="lg:w-1/2 mb-[2rem] lg:mb-0">
          <h1 className="text-[1.5rem] lg:text-[2rem] mb-[0.5rem]">
            Why MissMe?
          </h1>
          <p className="text-justify text-[0.9rem] lg:text-[1rem]">
            MissMe is built for privacy-first connections. Unlike open
            platforms, only mutual connections can chat — ensuring a safe,
            focused space for real talks.
          </p>
        </div>
        <div className="lg:w-1/2">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-md shadow-lg"
          >
            <div className="flex space-x-[1rem] px-[1rem] py-[0.8rem] border-b-[1px] border-gray-400">
              <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-gradient-to-r from-rose-600 to-rose-400"></div>
              <div className="space-y-[0.2rem]">
                <motion.div
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-[10rem] h-[1rem] bg-gray-400 rounded-full"
                ></motion.div>
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-[7rem] h-[1rem] bg-gray-300 rounded-full"
                ></motion.div>
              </div>
            </div>
            <div className="px-[1rem] py-[1rem]">
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
              <div className="">
                <p className="text-[0.9rem] lg:text-[1rem] px-[0.5rem] py-[0.2rem] rounded-sm w-fit bg-gradient-to-r from-rose-600 to-rose-500 text-white">
                  All good! Just checking out this app 😊
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center py-[1rem] shadow-lg my-[2rem]">
        <h1 className="text-center text-[2rem] text-rose-600 font-semibold mb-[2rem]">
          Testimonials
        </h1>
        <SlideShow data={testimonialsData} />
      </div>
      <div className="bg-rose-600 w-full text-white text-center py-[0.5rem] mt-[3rem]">
        © 2025 MissMe. All rights reserved.
      </div>
    </div>
  );
};

export default Home;
