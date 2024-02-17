import React, { useEffect } from "react";
import { useAddress, useContract, useContractRead, useENS } from "@thirdweb-dev/react";
import { STAKING_CONTRACT_ADDRESS } from "../addresses";
import PlantedFruit from "./PlantedFruit";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { ethers } from "ethers";

const Farm = () => {
  <Toaster position="top-right" />;
  const address = useAddress();
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const { data: plantedFruit, isLoading } = useContractRead(stakingContract, "getStakeInfo", [address]);
  const { data: poolEarn, refetch: refetchPoolEarn } = useContractRead(stakingContract, "getRewardTokenBalance", []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchPoolEarn();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetchPoolEarn]);

  if (isLoading) return <Image src="/loader.svg" width={200} height={200} alt="loading" />;

  return (
    <div>
      <p className="text-white py-2">
        POOL: <span className="text-green-500">{parseFloat(ethers.utils.formatUnits(poolEarn)).toFixed(3)} FRUIT</span>
      </p>
      <div className="flex flex-wrap justify-center gap-8 ">
        {plantedFruit &&
          plantedFruit[0]?.map((fruit, index) => <PlantedFruit key={index} tokenId={fruit.toNumber()} />)}
      </div>
    </div>
  );
};

export default Farm;
