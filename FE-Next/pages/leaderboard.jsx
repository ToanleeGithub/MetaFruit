import { useEffect, useState } from "react";
import { AppLayout } from "../components";
import axios from "axios";
import { ImPower } from "react-icons/im";
import { useAddress } from "@thirdweb-dev/react";

const Leaderboard = () => {
  const address = useAddress();
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`,
          { address: address },
          {
            signal: controller.signal,
          }
        );
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching data: ", error);
        }
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000);

    return () => {
      clearInterval(intervalId);
      controller.abort();
    };
  }, [address]);

  return (
    <AppLayout>
      <div className="flex flex-col items-center md:gap-5 gap-3">
        <h1 className="relative text-center md:text-6xl text-3xl text-yellow-500">LEADER BOARD</h1>
        <div className="absolute w-1/4 h-[300px] gradient-02 z-[-10]" />
        <div className="text-white text-xl flex justify-center items-center gap-5">
          <h1>YOUR POWER:</h1>
          <h1 className="flex justify-center items-center gap-1">
            <ImPower className="text-yellow-500" /> {data.specificUser.tokenFromRef}
          </h1>
        </div>
        {data.allUsers.map((item, index) => (
          <div key={index} className="flex items-center lg:w-1/2 w-full mx-auto">
            <h1 className="text-white min-w-10 md:text-2xl text-lg">{index + 1}</h1>
            <div className="md:min-w-[500px] min-w-[100px]">
              <div className="flex items-center gap-2">
                <p className="text-lg text-yellow-500 font-mono">code: {item.refCode}</p>
              </div>
              <h1 className="text-white md:block hidden">{item.address}</h1>
            </div>
            <div className="flex justify-center items-center gap-2">
              <ImPower className="text-yellow-500 md:text-2xl text-lg" />
              <h1 className="text-white md:text-2xl text-lg">{item.tokenFromRef}</h1>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Leaderboard;
