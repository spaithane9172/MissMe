import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Avatar from "boring-avatars";
import { useContext } from "react";
import { Context } from "../../context/AppContext";
import { motion } from "framer-motion";
import { div } from "motion/react-client";

const SlideShow = ({ data }) => {
  const { mode } = useContext(Context);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const bounceVariant = {
    hover: {
      y: [0, -10, 0, 5, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  return (
    <div className="w-[90vw] pb-[1rem] rounded-md">
      <Slider {...settings}>
        {data.map((elem) => {
          return (
            <div className="w-full">
              <motion.div
                whileHover={"hover"}
                key={elem.name}
                className="flex flex-col justify-center items-center w-full py-[2rem] lg:py-[3rem] border-[1px] border-gray-600 rounded-lg shadow-lg shadow-rose-300 px-[2rem]"
              >
                <div className="flex justify-end w-full mr-[2rem]">
                  <i className="absolute top-2 fa-solid fa-quote-right text-[2rem] text-rose-600"></i>
                </div>
                <div className="flex flex-col justify-center items-center mb-[0.5rem]">
                  <motion.div
                    variants={bounceVariant}
                    className="w-fit rounded-full border-[2px] border-rose-600"
                  >
                    <Avatar
                      size={40}
                      name={elem.name}
                      variant="beam"
                      colors={["#F43F5E", "#F9A8D4", "#FDE68A"]}
                    />
                  </motion.div>
                  <h1
                    className={`font-semibold mt-[0.5rem] ${
                      mode ? "text-black" : "text-white"
                    }`}
                  >
                    {elem.name}
                  </h1>
                </div>
                <p
                  className={`text-[0.9rem] text-center ${
                    mode ? "text-black" : "text-white"
                  }`}
                >
                  {elem.quote}
                </p>
              </motion.div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlideShow;
