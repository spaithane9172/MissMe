const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute top-0 left-0 bg-black/30 w-full h-[100vh] z-50 flex flex-col justify-center items-center">
      <button
        onClick={onClose}
        className="relative mb-[1rem]  bg-white rounded-full w-[3rem] h-[3rem] flex justify-center items-center cursor-pointer"
      >
        <i className="fa-solid fa-xmark text-[1.5rem]"></i>
      </button>
      <div>{children}</div>
    </div>
  );
};

export default Modal;
