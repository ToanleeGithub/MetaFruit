import axios from "axios";

const Log = async (tag, message) => {
  const logData = { tag, message };

  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/log`, logData);
};

export default Log;
