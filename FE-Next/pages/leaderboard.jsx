import { useEffect, useState } from "react";
import { AppLayout } from "../components";
import axios from "axios";
import { FaAngleDoubleRight } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import { useAddress } from "@thirdweb-dev/react";

const Leaderboard = () => {
  const address = useAddress();
  const [data, setData] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, []);
  const handleChangeName = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/changeName`, {
        address,
        name,
      });
      alert(response.data.message);
      setName("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col items-center md:gap-5 gap-3">
        <h1 className="relative text-center md:text-6xl text-3xl text-yellow-500">LEADER BOARD</h1>
        <div className="absolute w-1/4 h-[300px] gradient-02 z-[0]" />
        <div className="flex justify-center items-center gap-5 z-[10]">
          <input
            type="text"
            value={name}
            placeholder="NEW NICK NAME"
            className="md:max-w-[200px] max-w-[150px] text-center px-4 py-2"
            maxLength={12}
            onChange={(e) => setName(e.target.value)}
          />
          <FaAngleDoubleRight
            className="text-3xl rounded-[5px] font-bold text-yellow-500 bg-white p-1 box-content cursor-pointer"
            onClick={() => handleChangeName()}
          />
        </div>
        {data?.map((item, index) => (
          <div key={index} className="flex items-center lg:w-1/2 w-full mx-auto">
            <h1 className="text-white min-w-10 md:text-2xl text-lg">{index + 1}</h1>
            <div className="md:min-w-[500px] min-w-[100px]">
              <h1 className="text-white md:text-2xl text-lg">{item.nickName}</h1>
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
