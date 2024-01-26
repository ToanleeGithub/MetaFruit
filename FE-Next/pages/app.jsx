"use client";
import axios from "axios";
import crypto from "crypto";
import { useState, useEffect } from "react";
import { AppLayout, Bag, Farm } from "../components";
import { CiBag1 } from "react-icons/ci";
import { GiConsoleController, GiFarmTractor } from "react-icons/gi";
import {
  useAddress,
  ConnectWallet,
  useContract,
  useOwnedNFTs,
  useMetadata,
  MediaRenderer,
  Web3Button,
} from "@thirdweb-dev/react";
import { FARMER_ADDRESS } from "../addresses";

const app = () => {
  const [choose, setChoose] = useState("bag");
  const [code, setCode] = useState("");
  const [refCode, setRefCode] = useState("");

  const address = useAddress();

  useEffect(() => {
    const fetData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/takerefcode`, {
          address,
        });
        setRefCode(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetData();
  }, [address]);

  const { contract: farmerContract } = useContract(FARMER_ADDRESS);

  const { data: metadata } = useMetadata(farmerContract);
  const { data: ownedFarmerNFT, isLoading: loadingOwnedFarmer } = useOwnedNFTs(
    farmerContract,
    address
  );

  const handleSuccess = async (result, code) => {
    try {
      const refCode = crypto.randomBytes(5).toString("hex").slice(0, 5);
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/name`, {
        result,
        refCode,
        inviteCode: code,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!address)
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-[100%]">
          <ConnectWallet className="connectButton" />
        </div>
      </AppLayout>
    );

  if (loadingOwnedFarmer)
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-[100%]">
          <img src="/loader.svg" alt="Loading" />
        </div>
      </AppLayout>
    );

  if (ownedFarmerNFT?.length === 0)
    return (
      <AppLayout>
        <div className="flex flex-col justify-center items-center h-[100%] gap-5">
          <MediaRenderer
            src={metadata.image}
            alt="NFT Farmer"
            width="300px"
            height="300px"
            className="rounded-[20px]"
          />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Your Code"
            className="px-4 py-2 font-mono"
          />
          <Web3Button
            contractAddress={FARMER_ADDRESS}
            action={(contract) => contract.erc1155.claim(0, 1)}
            onSuccess={(result) => handleSuccess(result, code)}
            className="connectButton"
          >
            MINT YOUR FARMER
          </Web3Button>
        </div>
      </AppLayout>
    );

  return (
    <AppLayout>
      <div className="flex">
        {ownedFarmerNFT && (
          <div className="flex w-[300px] h-[300px] flex-col items-center gap-3 ">
            <p className="text-[40px] text-white">FARMER</p>
            <MediaRenderer
              src={ownedFarmerNFT[0]?.metadata.image}
              alt="NFT image"
              width="100%"
              height="100%"
              className="rounded-[20px]"
            />
            <p className="text-lg text-white">
              REFCODE:{" "}
              <span className="text-2xl text-yellow-500 font-mono font-bold">{refCode}</span>
            </p>
          </div>
        )}

        <div className="flex-1 pl-10 flex flex-col">
          {/* bag */}
          <div className="flex gap-10">
            <div
              className="bg-slate-700 p-3 rounded-[10px] cursor-pointer"
              onClick={() => setChoose("bag")}
            >
              <CiBag1 className="text-[40px] text-white hover:text-yellow-500 transition-all duration-500" />
            </div>

            <div
              className="bg-slate-700 p-3 rounded-[10px] cursor-pointer"
              onClick={() => setChoose("farm")}
            >
              <GiFarmTractor className="text-[40px] text-white hover:text-yellow-500 transition-all duration-500" />
            </div>
          </div>
          {/* end Bag */}

          <div className="mt-2">{choose === "bag" ? <Bag /> : <Farm />}</div>
        </div>
      </div>
    </AppLayout>
  );
};

export default app;
