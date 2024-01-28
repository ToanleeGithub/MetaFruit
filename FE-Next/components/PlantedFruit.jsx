import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";
import { FRUIT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../addresses";
import { ethers } from "ethers";
import { useEffect } from "react";

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
            width="100%"
            height="100%"
            alt="fruitNft"
            className="rounded-[20px]"
          />
          <p className="absolute top-[20px] left-[20px] text-center">{fruitNFT.metadata.name}</p>

          <div className="flex items-center flex-col gap-2">
            <Web3Button
              contractAddress={STAKING_CONTRACT_ADDRESS}
              action={(contract) => contract.call("withdraw", [tokenId, 1])}
              className="unPlantButton"
            >
              Unplanted {ethers.utils.formatUnits(claimableRewards[0], 0)}
            </Web3Button>
            <Web3Button
              contractAddress={STAKING_CONTRACT_ADDRESS}
              action={(contract) => contract.call("claimRewards", [tokenId])}
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
