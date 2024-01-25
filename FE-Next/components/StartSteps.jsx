const StartSteps = ({ number, text }) => (
  <div className={`flexCenter flex-row`}>
    <div className={`flexCenter w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]`}>
      <p className="text-[20px] text-white">{number}</p>
    </div>
    <p className="font-mono flex-1 ml-[30px] font-normal text-[18px] text-[#fff] leading-[32.4px]">
      {text}
    </p>
  </div>
);

export default StartSteps;
