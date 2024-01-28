import React from "react";
import { AppLayout } from "../components";
import { FRUIT_ADDRESS } from "../addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT } from "../components";

const Shop = () => {
  const { data: fruitContract } = useContract(FRUIT_ADDRESS);
  const { data: fruitNFTs } = useNFTs(fruitContract);
  return (
    <AppLayout>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
        {fruitNFTs?.map((nft, index) => (
          <NFT key={index} nft={nft} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Shop;
