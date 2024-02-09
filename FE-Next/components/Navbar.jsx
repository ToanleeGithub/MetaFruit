import React from "react";
import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";

const Navbar = () => {
  return (
    <motion.section variants={navVariants} initial="hidden" whileInView="show" className="sm:px-16 px-6 pt-8 relative">
      <div className="absolute w-1/2 inset-0 gradient-01"></div>
      <div className="innerWidth flex justify-between items-center">
        <Image src="/orange.webp" width={50} height={50} className="rounded-[10px] z-10" alt="fruit" />

        <div>
          <h1 className="md:text-[24px] text-[16px] text-white">CRYPTO GAME</h1>
        </div>

        <div className="flex gap-3 items-center">
          <Link href="/app">
            <Button>PLAY</Button>
          </Link>

          <a href="https://t.me/metafruitChannel" target="_blank" rel="noopener noreferrer">
            <p className="text-sky-500 text-3xl hover:text-white hover:scale-110 transition-all">
              <FaTelegram />
            </p>
          </a>
          <a href="https://twitter.com/metafruitpro" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-white text-3xl hover:scale-110 transition-all" />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Navbar;
