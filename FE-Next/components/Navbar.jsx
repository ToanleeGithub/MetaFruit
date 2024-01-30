import React from "react";
import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

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
            <Button name="APP" />
          </Link>
          <Link href="/docs">
            <Button name="DOCS" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default Navbar;
