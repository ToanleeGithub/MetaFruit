import React from "react";
import { AppLayout } from "../components";
import { motion } from "framer-motion";

const Event = () => {
  return (
    <AppLayout>
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
    </AppLayout>
  );
};

export default Event;
