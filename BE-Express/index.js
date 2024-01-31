const express = require("express");
const app = express();
const port = 3001;
const model = require("./model");
const cors = require("cors");
const crypto = require("crypto");

const db = require("./connectDB");
const Web3 = require("web3");
const web3 = new Web3("https://bsc-dataseed.binance.org/");

const priceArray = [
  5000, 6000, 7000, 8000, 10000, 12000, 14500, 17500, 21000, 25000,
];

db();

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: ["https://metafruit.pro", "https://www.metafruit.pro"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello ae");
});

app.post("/name", async (req, res) => {
  try {
    const { result, inviteCode } = req.body;
    const address = result.receipt.from;
    let refCode;
    let isUnique = false;

    while (!isUnique) {
      refCode = crypto.randomBytes(6).toString("hex").slice(0, 6);
      const existingUser = await model.userModel.findOne({ refCode });
      if (!existingUser) {
        isUnique = true;
      }
    }

    await model.userModel.create({ address, refCode, inviteCode });

    console.log("register success");
    res.json("thanh cong");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.post("/mintNFT", async (req, res) => {
  try {
    const { result } = req.body;

    const logReturn = result.receipt.logs.find(
      (log) =>
        log.topics[0] ===
        "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62"
    );

    const tokenIdHex = logReturn.data.substring(0, 66);
    const tokenId = web3.utils.hexToNumberString(tokenIdHex);

    const price = priceArray[tokenId];
    const address = result.receipt.from;
    const transactionHash = result.receipt.transactionHash;

    const hash = await model.hashModel.findOne({ hash: transactionHash });
    if (hash) {
      console.log("Invalid Hash");
      return;
    }
    await model.hashModel.create({ hash: transactionHash });

    const currentUser = await model.userModel.findOne({ address });
    if (!currentUser) {
      console.log("User not found");
      return;
    }

    const inviteUser = await model.userModel.findOne({
      refCode: currentUser.inviteCode,
    });
    if (!inviteUser) {
      console.log("Inviter not found");
      return;
    }

    inviteUser.tokenFromRef += Number(price);

    await inviteUser.save();
    console.log("Token from ref added success");
    res.send("hello");
  } catch (error) {
    console.log(error);
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const users = await model.userModel.find();
    let renderUsers = users.map((user) => user.toObject());
    renderUsers.sort((a, b) => b.tokenFromRef - a.tokenFromRef);

    res.json(renderUsers);
  } catch (error) {
    console.error(error);
  }
});

app.post("/changename", async (req, res) => {
  try {
    const { address, name } = req.body;

    const user = await model.userModel.findOne({ address });
    if (!user) return;

    user.nickName = name;

    await user.save();

    res.json({ message: "Name has changed" });
  } catch (error) {
    console.error(error);
  }
});

app.post("/takerefcode", async (req, res) => {
  try {
    const { address } = req.body;

    const user = await model.userModel.findOne({ address });
    if (!user) return;

    res.json(user.refCode);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log("Server running on port 3001");
});
