import { useContext } from "react";
import daybg from "../../assets/daybg.webp";
import nightbg from "../../assets/nightbg.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "../../context/AppContext";
const Navbar = () => {
  const { mode, setMode } = useContext(Context);
  return (
    <div className="px-[2rem] flex justify-between items-center h-[3rem]">
      <div>Logo</div>

      <button
        onClick={() => {
          setMode(!mode);
        }}
        className={`z-1 w-[3.5rem] h-[2rem] flex items-center ${
          mode ? "justify-start" : "justify-end"
        } rounded-full`}
      >
        <img
          src={mode ? daybg : nightbg}
          alt=""
          className={`absolute -z-1 w-[3.5rem] h-[2rem] rounded-full border-[1px] ${
            mode ? "border-black" : "border-white"
          }`}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`mx-[0.1rem] w-[1.7rem] h-[1.7rem] rounded-full bg-white flex justify-center items-center border-[1px] border-gray-600`}
        >
          <AnimatePresence mode="wait">
            {mode ? (
              <motion.i
                key={"sun"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="fa-solid fa-sun text-amber-300 rounded-full text-[1.2rem]"
              ></motion.i>
            ) : (
              <motion.i
                key={"moon"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="fa-solid fa-moon text-black rounded-full text-[1.2rem]"
              ></motion.i>
            )}
          </AnimatePresence>
        </motion.div>
      </button>
    </div>
  );
};

export default Navbar;

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import daybg from "../../assets/daybg.webp";
// import nightbg from "../../assets/nightbg.jpg";

// const Navbar = () => {
//   const [mode, setMode] = useState(true);

//   return (
//     <div className="px-[2rem] flex justify-between items-center h-[3rem]">
//       <div>Logo</div>

//       <motion.button
//         onClick={() => setMode(!mode)}
//         className={`w-[3.5rem] h-[2rem] flex items-center ${
//           mode ? "justify-start" : "justify-end"
//         } rounded-full relative overflow-hidden`}
//         initial={false}
//         animate={{ backgroundColor: mode ? "#ffffff" : "#111827" }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       >
//         {/* Background Image (with fade animation) */}
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={mode ? "day" : "night"}
//             src={mode ? daybg : nightbg}
//             alt=""
//             className="absolute top-0 left-0 w-[3.5rem] h-[2rem] rounded-full object-cover"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           />
//         </AnimatePresence>

//         {/* Toggle Circle */}
//         <motion.div
//           layout
//           className="mx-[0.1rem] w-[1.7rem] h-[1.7rem] rounded-full bg-white flex justify-center items-center border-[1px] border-gray-600 z-10"
//           transition={{ type: "spring", stiffness: 300, damping: 20 }}
//         >
//           <AnimatePresence mode="wait">
//             {mode ? (
//               <motion.i
//                 key="sun"
//                 className="fa-solid fa-sun text-amber-300 text-[1.2rem]"
//                 initial={{ opacity: 0, rotate: -90 }}
//                 animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: 90 }}
//                 transition={{ duration: 0.3 }}
//               />
//             ) : (
//               <motion.i
//                 key="moon"
//                 className="fa-solid fa-moon text-black text-[1.2rem]"
//                 initial={{ opacity: 0, rotate: 90 }}
//                 animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: -90 }}
//                 transition={{ duration: 0.3 }}
//               />
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </motion.button>
//     </div>
//   );
// };

// export default Navbar;
