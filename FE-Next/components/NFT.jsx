import {
  MediaRenderer,
  Web3Button,
  useContract,
  useActiveClaimCondition,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { FRUIT_ADDRESS } from "../addresses";
import Image from "next/image";
import axios from "axios";

const NFT = ({ nft }) => {
  const { contract } = useContract(FRUIT_ADDRESS);
  const { data, isLoading } = useActiveClaimCondition(contract, nft.metadata.id);

  const handleSuccess = async (result) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mintNFT`, { result });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center gap-2">
      <MediaRenderer
        src={nft.metadata.image}
        alt="NFT Image"
        key={nft.id}
        width="300px"
        height="300px"
        className="rounded-xl"
      />
      <p className="absolute bottom-[110px] text-center text-[24px]">{nft.metadata.name}</p>
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
        onSuccess={(result) => handleSuccess(result)}
        className="connectButton"
      >
        Mint NFT
      </Web3Button>
    </div>
  );
};

export default NFT;
