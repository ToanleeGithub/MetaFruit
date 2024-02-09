import React from "react";
import { MediaRenderer, useAddress, useContract, useOwnedNFTs, Web3Button } from "@thirdweb-dev/react";
import { FRUIT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../addresses";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const Bag = () => {
  <Toaster position="top-right" />;
  const address = useAddress();
  const { contract: fruitContract } = useContract(FRUIT_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const { data: ownedFruitNFTs, isLoading: loadingFruitNFTs } = useOwnedNFTs(fruitContract, address);

  async function plant(id) {
    if (!address) return;
    const isApprove = await fruitContract?.erc1155.isApproved(address, STAKING_CONTRACT_ADDRESS);

    if (!isApprove) {
      await fruitContract?.erc1155.setApprovalForAll(STAKING_CONTRACT_ADDRESS, true);
    }

    await stakingContract?.call("stake", [id, 1]);
  }

  if (loadingFruitNFTs) return <Image src="/loader.svg" width={100} height={100} alt="loading" />;

  if (ownedFruitNFTs?.length === 0)
    return (
      <div className="h-[300px] flex justify-center items-center flex-col gap-5">
        <h1 className="text-white text-[50px]">No NFT!</h1>
        <Link href="/shop">
          <button className="buttonBuyShop px-4 py-2 border-2 bg-yellow-500 border-yellow-500 text-[30px] transition-all duration-500">
            SHOP
          </button>
        </Link>
      </div>
    );

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
      {ownedFruitNFTs?.map((nft, index) => (
        <div key={index}>
          <MediaRenderer src={nft.metadata.image} width="200px" height="200px" className="rounded-[20px] mx-auto" />
          <p className="text-center text-white">{nft.metadata.name}</p>
          <div className="flex justify-center">
            <Web3Button
              contractAddress={STAKING_CONTRACT_ADDRESS}
              action={() => plant(nft.metadata.id)}
              onSuccess={() => toast.success("PLANTED!")}
              className="plantButton"
            >
              Plant {nft.quantityOwned}
            </Web3Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bag;
