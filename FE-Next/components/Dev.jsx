import React from "react";
import { motion } from "framer-motion";
import { dev } from "../constants";
import Image from "next/image";

const Dev = () => {
  return (
    <div className="paddings flex justify-center flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        className="mt-[8px] md:text-[64px] text-[40px] text-white leading-none py-4"
      >
        OUR TEAM
      </motion.h1>
      <div className="flex flex-wrap gap-10 justify-center">
        {dev.map((item, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: index * 0.2 } }}
            key={index}
            className="flex justify-center items-center flex-col text-white"
          >
            <Image src={item.img} alt="dev" width={330} height={330} className="rounded-xl" />
            <p className="font-mono mt-2">{item.name}</p>
            <p>{item.position}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dev;
