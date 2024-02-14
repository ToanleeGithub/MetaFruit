import Image from "next/image";
import React from "react";

const Backer = () => {
  return (
    <div className="paddings flex gap-2 justify-center flex-wrap">
      <Image src="/part1.png" width={200} height={200} />
      <Image src="/part2.png" width={200} height={200} />
      <Image src="/part3.png" width={200} height={200} />
      <Image src="/part4.png" width={200} height={200} />
    </div>
  );
};

export default Backer;
