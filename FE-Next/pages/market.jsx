import React from "react";
import { AppLayout } from "../components";
import Image from "next/image";
import { FaExchangeAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Marketplace = () => {
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
        <motion.h1 variants={itemVariant} className="text-center md:text-6xl text-3xl text-orange-500">
          MARKETPLACE
        </motion.h1>
        <motion.p variants={itemVariant} className="text-center md:text-2xl text-xl text-white font-mono">
          Freely trade NFTs with each other.
        </motion.p>
        <motion.h1 variants={itemVariant} className="text-center md:text-4xl text-2xl text-white">
          (COMING SOON!)
        </motion.h1>
        <motion.div variants={itemVariant} className="sm:flex hidden gap-5 justify-center items-center">
          <Image src="/orange.webp" width={200} height={200} className="rounded-2xl" />
          <FaExchangeAlt className="text-3xl text-white" />
          <p className="text-[150px] text-orange-500 font-serif">$</p>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default Marketplace;
