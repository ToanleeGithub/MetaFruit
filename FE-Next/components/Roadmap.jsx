import React from "react";
import { motion } from "framer-motion";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

const Roadmap = () => {
  const listVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.5,
      },
    },
  };
  const itemVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };
  return (
    <div className="paddings">
      <div className="flex justify-center flex-col items-center gap-5">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.5, duration: 1.5 } }}
          className="mt-[8px] md:text-[64px] text-[40px] text-white leading-none"
        >
          ROADMAP
        </motion.h1>

        <motion.ul variants={listVariant} initial="hidden" whileInView="show">
          <motion.li variants={itemVariant} className="flex items-center gap-3">
            <FaRegCheckCircle className="font-mono text-3xl text-green-500" />
            <h1 className="font-mono text-3xl text-white">Ideation</h1>
          </motion.li>

          <motion.li variants={itemVariant} className="flex items-center gap-3">
            <FaRegCheckCircle className="font-mono text-3xl text-green-500" />
            <h1 className="font-mono text-3xl text-white">Seed funding round.</h1>
          </motion.li>

          <motion.li variants={itemVariant} className="flex items-center gap-3">
            <FaRegCheckCircle className="font-mono text-3xl text-green-500" />
            <h1 className="font-mono text-3xl text-white">Testnet</h1>
          </motion.li>

          <motion.li variants={itemVariant} className="flex items-center gap-3">
            <FaRegCheckCircle className="font-mono text-3xl text-green-500" />
            <h1 className="font-mono text-3xl text-white">Mainnet launch + DEX listing</h1>
          </motion.li>

          <motion.li variants={itemVariant} className="flex items-center gap-3">
            <FaRegCircle className="font-mono text-3xl text-green-500" />
            <h1 className="font-mono text-3xl text-white">Merge and upgrade NFT</h1>
          </motion.li>

          <motion.li variants={itemVariant} className="flex items-center gap-3">
            <FaRegCircle className="font-mono text-3xl text-green-500" />
            <h1 className="font-mono text-3xl text-white">Marketplace</h1>
          </motion.li>

          <motion.li variants={itemVariant} className="flex items-center gap-3">
            <FaRegCircle className="font-mono text-3xl text-green-500" />
            <h1 className="font-mono text-3xl text-white">CEX listing</h1>
          </motion.li>
        </motion.ul>
      </div>
    </div>
  );
};

export default Roadmap;
