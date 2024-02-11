import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";
import { IoAppsSharp } from "react-icons/io5";
import { AiOutlineShop } from "react-icons/ai";
import { MdLeaderboard } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import { MdEmojiEvents } from "react-icons/md";
import Image from "next/image";
import { useEffect, useState } from "react";

const AppLayout = ({ children }) => {
  const [active, setActive] = useState("");

  const handleActive = (page) => {
    localStorage.setItem("activePage", page);
  };

  useEffect(() => {
    const activePage = localStorage.getItem("activePage");
    setActive(activePage);
  }, []);

  const eventVariant = {
    hidden: {
      scale: 1,
    },
    show: {
      scale: [1, 1.3, 1.3, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="min-h-[72px] xPaddings py-4">
      <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className="innerWidth flex justify-between items-center"
      >
        <Link href="/">
          <Image src="/orange.webp" alt="logo" width={70} height={70} className="rounded-[10px]" />
        </Link>

        <div className="flex items-center gap-5">
          <h1 className="md:block hidden text-[30px] gradient-text2">WELCOME</h1>
          <GiFruitBowl className="text-3xl text-white" />
        </div>

        <ConnectWallet
          theme={"dark"}
          btnTitle={"Connect Wallet"}
          modalTitle={"Connect Wallet"}
          modalSize={"wide"}
          welcomeScreen={{
            img: {
              src: "https://e31dabcdf3218024921ae9071ebaa065.ipfscdn.io/ipfs/bafybeiewf77dbpwnan6wpkfc5xhmhbogsmdl6qg6ed5xym2a5wgfbeuaxm/9.webp",
              width: 300,
              height: 300,
            },
            title: "WELCOME TO META",
            subtitle: "THE FUTURE OF FRUIT",
          }}
          modalTitleIconUrl={
            "https://e31dabcdf3218024921ae9071ebaa065.ipfscdn.io/ipfs/bafybeiapl6kix5al3jpz3d7vssqupkfemxsbxthqh2zbhzthnl25bpsgxm/2.webp"
          }
        />
      </motion.div>

      <div className="py-8 innerWidth flex md:flex-row flex-col z-[10]">
        <div className="md:w-[70px] w-[300px] md:h-[350px] h-[70px] rounded-[20px] bg-slate-700 flex md:flex-col px-4 py-8 items-center max-md:justify-center gap-8 mb-5">
          <Link href="/app" onClick={() => handleActive("app")}>
            <IoAppsSharp
              className={`${
                active === "app" ? "text-yellow-500" : "text-white"
              } md:text-[40px] text-[30px] cursor-pointer text-white hover:text-yellow-500 transition-all duration-600`}
            />
          </Link>

          <Link href="/shop" onClick={() => handleActive("shop")}>
            <AiOutlineShop
              className={`${
                active === "shop" ? "text-yellow-500" : "text-white"
              } md:text-[40px] text-[30px] cursor-pointer text-white hover:text-yellow-500 transition-all duration-600`}
            />
          </Link>

          <Link href="/leaderboard" onClick={() => handleActive("leaderboard")}>
            <MdLeaderboard
              className={`${
                active === "leaderboard" ? "text-yellow-500" : "text-white"
              } md:text-[40px] text-[30px] cursor-pointer text-white hover:text-yellow-500 transition-all duration-600`}
            />
          </Link>

          <Link href="/event" onClick={() => handleActive("event")}>
            <motion.div variants={eventVariant} initial="hidden" animate="show" className="hover:text-yellow-500">
              <MdEmojiEvents
                className={`${
                  active === "event" ? "text-yellow-500" : "text-white"
                } md:text-[40px] text-[30px] cursor-pointer text-white hover:text-yellow-500 transition-all duration-600`}
              />
              <p className="text-[12px] text-center text-white">EVENT</p>
            </motion.div>
          </Link>
        </div>

        <div className=" w-full sm:pl-10 pl-1">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
