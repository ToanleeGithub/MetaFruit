import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";
import { IoAppsSharp } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import { MdLeaderboard } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import Image from "next/image";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-[72px] xPaddings py-4">
      <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className="innerWidth flex justify-between items-center"
      >
        <Link href="/">
          <Image
            src="/fruittoken3.webp"
            alt="logo"
            width={70}
            height={70}
            className="rounded-[10px]"
          />
        </Link>

        <div className="flex items-center gap-5">
          <h1 className="md:block hidden text-[30px] gradient-text2">WELCOME</h1>
          <GiFruitBowl className="text-3xl text-white" />
        </div>

        <ConnectWallet />
      </motion.div>

      <div className="py-8 innerWidth flex z-[10]">
        <div className="w-[70px] h-[250px] rounded-[20px] bg-slate-700 flex flex-col px-4 py-8 items-center gap-8">
          <Link href="/app">
            <IoAppsSharp className='text-[40px] "text-white" cursor-pointer text-white hover:text-yellow-500 transition-all duration-600' />
          </Link>

          <Link href="/shop">
            <AiOutlineShop className='text-[40px] "text-white" cursor-pointer text-white hover:text-yellow-500 transition-all duration-600' />
          </Link>

          <Link href="/leaderboard">
            <MdLeaderboard className='text-[40px] "text-white" cursor-pointer text-white hover:text-yellow-500 transition-all duration-600' />
          </Link>
        </div>

        <div className=" w-full sm:pl-10 pl-1">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
