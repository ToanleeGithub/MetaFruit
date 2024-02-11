import React from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { STAKING_CONTRACT_ADDRESS } from "../addresses";
import PlantedFruit from "./PlantedFruit";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

const Farm = () => {
  <Toaster position="top-right" />;
  const address = useAddress();
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const { data: plantedFruit, isLoading } = useContractRead(stakingContract, "getStakeInfo", [address]);

  if (isLoading) return <Image src="/loader.svg" width={200} height={200} alt="loading" />;

  return (
    <div className="flex flex-wrap justify-center gap-8 ">
      {plantedFruit && plantedFruit[0]?.map((fruit, index) => <PlantedFruit key={index} tokenId={fruit.toNumber()} />)}
    </div>
  );
};

export default Farm;
