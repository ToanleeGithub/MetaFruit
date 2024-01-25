import React from "react";

const Button = ({ name }) => {
  return (
    <div className="bg-[#E0CC00] px-4 py-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer hover:bg-transparent hover:text-white hover:ring-1 hover:ring-white font-normal">
      {name}
    </div>
  );
};

export default Button;
