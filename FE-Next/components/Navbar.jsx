import { useState } from "react";
import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";

const Navbar = () => {
  const [isHover, setIsHover] = useState(false);
  console.log(isHover);
  return (
    <motion.section variants={navVariants} initial="hidden" whileInView="show" className="sm:px-16 px-6 pt-8 relative">
      <div className="absolute w-1/2 inset-0 gradient-01"></div>
      <div className="innerWidth flex justify-between items-center">
        <Image src="/orange.webp" width={50} height={50} className="rounded-[10px] z-10" alt="fruit" />

        <div>
          <h1 className="sm:block hidden md:text-[24px] text-[16px] text-white">CRYPTO GAME</h1>
        </div>

        <div className="flex gap-3 items-center">
          <Link href="/app" onClick={() => localStorage.setItem("activePage", "app")}>
            <Button>PLAY</Button>
          </Link>
          <Link href="https://metafruit.gitbook.io/metafruit-2/" target="_blank">
            <Button>DOCS</Button>
          </Link>

          <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="relative">
            <p className="text-sky-500 text-3xl hover:text-white hover:scale-110 transition-all">
              <FaTelegram />
            </p>

            {/* <div className="absolute top-[100%] right-0 bg-red-200 w-[100px] h-[10px]" /> */}

            {isHover ? (
              <div className="absolute top-[100%] right-[-170%] w-[120px] h-[100px] bg-white text-yellow-500 p-4 z-0 text-right flex flex-col gap-3 rounded-xl shadow-lg">
                <a href="https://t.me/metafruitChannel" target="_blank">
                  CHANNEL
                </a>
                <a href="https://t.me/metafruitchat" target="_blank">
                  CHAT
                </a>
              </div>
            ) : null}
          </div>

          <a href="https://twitter.com/metafruitpro" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-white text-3xl hover:scale-110 transition-all" />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Navbar;
