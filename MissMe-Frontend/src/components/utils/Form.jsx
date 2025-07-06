const Form = ({ title, button, formDetails }) => {
  return (
    <div>
      <form className="flex flex-col justify-center items-center">
        {formDetails.map((elem, indx) => {
          return (
            <div key={indx} className="w-full">
              {(elem.type === "text" ||
                elem.type === "email" ||
                elem.type === "password") && (
                <input
                  type={elem.type}
                  name={elem.name}
                  placeholder={elem.placeholder}
                  className="border-[1px] border-rose-600 w-full lg:w-[30vw] py-[0.5rem] lg:py-[0.7rem] px-[0.5rem] my-[0.3rem] lg:my-[0.5rem] outline-none rounded-md shadow-lg focus:shadow-rose-300 placeholder:text-[0.9rem] lg:placeholder:text-[1rem]"
                />
              )}
            </div>
          );
        })}

        <button
          className="bg-rose-600 text-white mt-[0.8rem] lg:mt-[1rem] py-[0.5rem] lg:py-[0.7rem] px-[0.5rem] w-full rounded-md shadow-lg cursor-pointer"
          onClick={button.buttonFunction}
        >
          {button.buttonName}
        </button>
      </form>
    </div>
  );
};

export default Form;
