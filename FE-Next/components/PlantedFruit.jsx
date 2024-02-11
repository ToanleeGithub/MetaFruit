import { MediaRenderer, Web3Button, useAddress, useContract, useContractRead, useNFT } from "@thirdweb-dev/react";
import { FRUIT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../addresses";
import { ethers } from "ethers";
import { useEffect } from "react";
import { ImPower } from "react-icons/im";
import { fruit } from "../constants";
import toast, { Toaster } from "react-hot-toast";
import Log from "../logger";

const PlantedFruit = ({ tokenId }) => {
  const address = useAddress();

  const { contract: fruitContract } = useContract(FRUIT_ADDRESS);
  const { data: fruitNFT } = useNFT(fruitContract, tokenId);

  const { data: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const { data: claimableRewards, refetch: refetchStakeInfo } = useContractRead(
    stakingContract,
    "getStakeInfoForToken",
    [tokenId, address]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      refetchStakeInfo();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetchStakeInfo]);

  return (
    <div>
      {fruitNFT && claimableRewards && (
        <div className="relative flex flex-col gap-2">
          <MediaRenderer
            src={fruitNFT.metadata.image}
            width="250px"
            height="250px"
            alt="fruitNft"
            className="rounded-[20px]"
          />
          <div className="absolute top-[20px] left-[20px] text-center text-white flex flex-col justify-center items-center">
            <ImPower />
            <p>{fruit[tokenId]?.farmSpeed}</p>
          </div>

          <div className="flex items-center flex-col gap-2">
            <Web3Button
              contractAddress={STAKING_CONTRACT_ADDRESS}
              action={(contract) => contract.call("withdraw", [tokenId, 1])}
              onSuccess={() => {
                toast.success("UNPLANTED DONE!");
                Log("Unplanted", `${address} Unplanted ${fruitNFT.metadata.name} Successfully!`);
              }}
              className="unPlantButton"
            >
              Unplanted {ethers.utils.formatUnits(claimableRewards[0], 0)}
            </Web3Button>
            <Web3Button
              contractAddress={STAKING_CONTRACT_ADDRESS}
              action={(contract) => contract.call("claimRewards", [tokenId])}
              onSubmit={() =>
                Log(
                  "Claim",
                  `${address} Submit Claim ${parseFloat(ethers.utils.formatUnits(claimableRewards[1], 18)).toFixed(
                    3
                  )} Token`
                )
              }
              onSuccess={() => {
                Log("Claim", `${address} claimed Successfully`);
                toast.success("CLAIM SUCCESSFULLY");
              }}
              onError={() => {
                Log("Claim", `${address} claimed Failed`);
                toast.error("CLAIM FAILED");
              }}
              className="claimButton"
            >
              Claim{" "}
              <p className="text-yellow-500">
                {parseFloat(ethers.utils.formatUnits(claimableRewards[1], 18)).toFixed(3)}
              </p>
            </Web3Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantedFruit;
