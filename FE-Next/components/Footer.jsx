import React from "react";
import { FaRegCopyright } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="bg-black h-[200px] flex flex-col justify-center items-center text-white gap-3">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1, transition: { duration: 2, delay: 0.5 } }}
        className="flex items-center gap-3"
      >
        <FaRegCopyright className="" />
        <p className="font-mono">2024 metafruit.pro</p>
      </motion.div>
    </div>
  );
};

export default Footer;
