import ThemeButton from "../ThemeButton";
import logo from "../../assets/logo.png";
const Navbar = () => {
  return (
    <nav className="fixed w-[100vw] h-[8vh] lg:h-[10vh] flex justify-between items-center bg-rose-600 px-[1rem] z-50">
      <div>
        <img
          src={logo}
          alt=""
          className="w-[7rem] h-[7rem] lg:w-[10rem] lg:h-[10rem]"
        />
      </div>
      <ThemeButton />
    </nav>
  );
};

export default Navbar;
