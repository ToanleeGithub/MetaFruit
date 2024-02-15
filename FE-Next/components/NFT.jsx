import { MediaRenderer, Web3Button, useContract, useActiveClaimCondition, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { FRUIT_ADDRESS } from "../addresses";
import Image from "next/image";
import axios from "axios";
import { fruit } from "../constants";
import { ImPower } from "react-icons/im";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Log from "../logger";

const NFT = ({ nft }) => {
  const address = useAddress();
  const { contract } = useContract(FRUIT_ADDRESS);
  const { data, isLoading } = useActiveClaimCondition(contract, nft.metadata.id);
  console.log(nft);

  const handleSuccess = async (result) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mintNFT`, { result });
      toast.success("MINT NFT SUCCESSFULLY");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center gap-2">
      <Toaster position="top-right" />
      <motion.div whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
        <MediaRenderer
          src={nft.metadata.image}
          alt="NFT Image"
          key={nft.id}
          width="250px"
          height="250px"
          className="rounded-xl"
        />
      </motion.div>
      <div className="absolute top-0 left-0">
        <div className="flex justify-center items-center relative" style={{ width: "70px", height: "70px" }}>
          <motion.div
            animate={{
              rotate: 360,
              transition: { duration: 10, repeat: Infinity, repeatType: "loop", ease: "linear" },
            }}
            className="absolute"
          >
            <Image src="/img-circle.png" width={70} height={70} className="grayscale" />
          </motion.div>
          <p className="absolute text-yellow-500 text-xl z-10">{nft.supply}</p>
        </div>
      </div>
      <p className=" absolute bottom-[29%] text-center sm:text-[24px] text-[16px] text-white">{nft.metadata.name}</p>

      {!isLoading && data ? (
        <p className="text-lg text-center text-yellow-500">
          Cost: {ethers.utils.formatUnits(data?.price)} {" " + data?.currencyMetadata.symbol}
        </p>
      ) : (
        <Image src="/loader.svg" width={50} height={50} alt="loading" />
      )}
      <Web3Button
        contractAddress={FRUIT_ADDRESS}
        action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
        onSuccess={(result) => {
          handleSuccess(result);
          Log("Mint NFT", `${address} Minted ${nft.metadata.name} Successfully`);
        }}
        onError={() => toast.error("MINT NFT FAILED")}
        className="connectButton"
      >
        <div className="flex justify-center items-center gap-2 text-[20px]">
          <ImPower />
          <p>{fruit[nft.metadata.id]?.farmSpeed}/h</p>
        </div>
      </Web3Button>
    </div>
  );
};

export default NFT;
