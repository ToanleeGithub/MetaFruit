import axios from "axios";
import { useState, useEffect } from "react";
import { AppLayout, Bag, Farm } from "../components";
import { CiBag1 } from "react-icons/ci";
import { GiFarmTractor } from "react-icons/gi";
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
import Image from "next/image";

const App = () => {
  const [choose, setChoose] = useState("bag");
  const [code, setCode] = useState("");
  const [refCode, setRefCode] = useState("");
  const [isFarmer, setIsFarmer] = useState(false);

  const address = useAddress();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsFarmer(false);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/takerefcode`,
          { address },
          {
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
          }
        );
        setRefCode(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching data: ", error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [address, isFarmer]);

  const { contract: farmerContract } = useContract(FARMER_ADDRESS);

  const { data: metadata } = useMetadata(farmerContract);
  const { data: ownedFarmerNFT, isLoading: loadingOwnedFarmer } = useOwnedNFTs(farmerContract, address);

  const handleSuccess = async (result, code) => {
    const controller = new AbortController();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/name`,
        { result, inviteCode: code },
        { headers: { "Content-Type": "application/json" }, signal: controller.signal }
      );
      setIsFarmer(true);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.log(error);
      }
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
          <Image src="/loader.svg" alt="Loading" width={100} height={100} />
        </div>
      </AppLayout>
    );

  if (ownedFarmerNFT?.length === 0)
    return (
      <AppLayout>
        <div className="flex flex-col justify-center items-center h-[100%] gap-5">
          <MediaRenderer
            src={metadata?.image}
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
            action={async (contract) => await contract.erc1155.claim(0, 1)}
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
      <div className="flex sm:flex-row flex-col">
        {ownedFarmerNFT && (
          <div className="flex lg:w-[300px] w-[200px] lg:h-[300px] h-[200px] flex-col items-center">
            <p className="text-[40px] text-white">FARMER</p>
            <MediaRenderer
              src={ownedFarmerNFT[0]?.metadata.image}
              alt="NFT image"
              width="100%"
              height="100%"
              className="sm:block hidden rounded-[20px]"
            />
            <p className="text-lg text-white">
              REFCODE: <span className="text-2xl text-yellow-500 font-mono font-bold">{refCode}</span>
            </p>
          </div>
        )}

        <div className="flex-1 pl-10 flex flex-col max-md:mx-auto">
          {/* bag */}
          <div className="flex gap-5">
            <div className="bg-slate-700 p-3 rounded-[10px] cursor-pointer" onClick={() => setChoose("bag")}>
              <CiBag1 className="text-[40px] text-white hover:text-yellow-500 transition-all duration-500" />
            </div>

            <div className="bg-slate-700 p-3 rounded-[10px] cursor-pointer" onClick={() => setChoose("farm")}>
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

export default App;
