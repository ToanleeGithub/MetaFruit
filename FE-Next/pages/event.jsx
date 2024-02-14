import React, { useState } from "react";
import { AppLayout } from "../components";
import { motion } from "framer-motion";
import { ImPower } from "react-icons/im";
import Image from "next/image";
import { superPowerNft } from "../constants";

const Event = () => {
  const thunderVariant = {
    hidden: {
      opacity: 1,
    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 2,
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariant = {
    hidden: {
      opacity: 0,
    },
    show: (i = 0) => ({
      opacity: [0, 1, 0],
      transition: {
        delay: i * 0.5,
        repeat: Infinity,
        repeatDelay: 1.5,
      },
    }),
  };
  return (
    <AppLayout>
      {/* TELEGRAM */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
          className="text-center text-4xl text-yellow-500"
        >
          TELEGRAM TOP RACE
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 1 } }}
          className="lg:px-16 px-5 text-white text-xl mt-5"
        >
          <p className="font-mono">The Event will take place in 2 Rounds</p>
          <p className="font-mono">Round 1: from February 12th to February 18th</p>
          <p className="font-mono">Round 2: from February 19th to February 26th</p>
          <p className="font-mono mt-5">
            Each week, the top 10 users who invite the most friends to join the Telegram will be rewarded with a special
            NFT - <span className="font-bold font-mono">"Meta Milk"</span>.
          </p>
          <p className="font-mono mt-5">
            Details about the winners will be announced on the{" "}
            <motion.a
              href="https://t.me/metafruitchat"
              target="_blank"
              className="font-mono font-extrabold text-yellow-500"
            >
              official Telegram channel
            </motion.a>
            .
          </p>
        </motion.div>
      </div>

      {/* Super Power */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.5 } }}
        className="mt-10"
      >
        {/* Thunder */}
        <div className="flex justify-center items-center gap-5">
          <motion.div variants={thunderVariant} initial="hidden" animate="show" className="flex">
            <motion.div variants={itemVariant} custom={2}>
              <ImPower className="text-2xl text-yellow-500" />
            </motion.div>
            <motion.div variants={itemVariant} custom={1}>
              <ImPower className="text-2xl text-yellow-500" />
            </motion.div>
            <motion.div variants={itemVariant} custom={0}>
              <ImPower className="text-2xl text-yellow-500" />
            </motion.div>
          </motion.div>

          <h1 className="text-center text-4xl text-white">SUPER POWER</h1>

          <motion.div variants={thunderVariant} initial="hidden" animate="show" className="flex">
            <motion.div variants={itemVariant} custom={0}>
              <ImPower className="text-2xl text-yellow-500" />
            </motion.div>
            <motion.div variants={itemVariant} custom={1}>
              <ImPower className="text-2xl text-yellow-500" />
            </motion.div>
            <motion.div variants={itemVariant} custom={2}>
              <ImPower className="text-2xl text-yellow-500" />
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:px-16 px-5 text-white text-xl mt-5">
          <p className="font-mono">Whenever your referrals mint NFTs, you will be rewarded with Powers. </p>
          <p className="font-mono">Each FRUIT equals one Power.</p>
          <p className="font-mono">The top player will be graced with an exclusive NFT as a weekly reward!</p>
          <p className="font-mono text-yellow-500">The first week kicks off on February 18th.</p>
        </div>

        <div className="lg:px-16 px-5 text-white text-xl mt-5 flex gap-5 flex-wrap justify-center">
          {superPowerNft?.map((item, index) => {
            return (
              <div key={index} style={{ perspective: "1000px", width: "300px", height: "300px" }}>
                <motion.div
                  initial={{ rotateY: 0 }}
                  whileHover={{ rotateY: 180 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
                  style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
                  className=" cursor-pointer"
                >
                  <div className="absolute w-full h-full rounded-xl" style={{ backfaceVisibility: "hidden" }}>
                    <Image src={item.img} width={300} height={300} className="rounded-xl object-cover" />
                  </div>
                  <div
                    className="absolute w-full h-full rounded-xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)", // Quay mặt này để nó ở phía sau
                    }}
                  >
                    <div className="w-[300px] h-[300px] bg-white rounded-xl p-5">
                      <h1 className="text-black text-center py-3">TOP: {item.top}</h1>
                      <h1 className="text-yellow-500">{item.name}</h1>
                      <h1 className="text-black">Price: {item.price}</h1>
                      <h1 className="text-black">FarmSpeed: {item.farmSpeed}</h1>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Event;
