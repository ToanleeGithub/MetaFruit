import React from "react";
import { AppLayout } from "../components";
import Image from "next/image";
import { FaLongArrowAltDown } from "react-icons/fa";
import { motion } from "framer-motion";

const Merge = () => {
  const listVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariant = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <AppLayout>
      <motion.div variants={listVariant} initial="hidden" animate="show" className="flex flex-col items-center gap-5">
        <motion.h1 variants={itemVariant} className="text-center md:text-6xl text-3xl text-green-500">
          MERGE AND UPGRADE NFT
        </motion.h1>
        <motion.h1 variants={itemVariant} className="text-center md:text-2xl text-xl text-white font-mono">
          In this feature, User can burn 2 NFTs to get a higher level NFT
        </motion.h1>
        <motion.h1 variants={itemVariant} className="md:text-4xl text-2xl text-white">
          (COMING SOON!!)
        </motion.h1>
        <motion.div variants={itemVariant} className="md:flex hidden flex-col items-center gap-5">
          <div className="flex justify-center items-center gap-10">
            <Image src="/applefruit.webp" width={200} height={200} className="rounded-xl" />
            <p className="text-7xl text-white">+</p>
            <Image src="/applefruit.webp" width={200} height={200} className="rounded-xl" />
          </div>
          <FaLongArrowAltDown className="text-4xl text-yellow-500" />
          <Image src="/applefruit2.webp" width={200} height={200} className="rounded-xl" />
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default Merge;
