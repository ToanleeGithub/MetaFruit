const express = require("express");
const app = express();
const port = 3001;
const model = require("./model");
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs");

const db = require("./connectDB");
const Web3 = require("web3");
const path = require("path");
const web3 = new Web3("https://bsc-dataseed.binance.org/");

const priceArray = [
  5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 100000,
  200000, 0, 1500,
];

db();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(
  cors({
    origin: "https://metafruit.pro",
    // origin: "http://localhost:3000",
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

app.post("/leaderboard", async (req, res) => {
  try {
    const users = await model.userModel.find();
    let renderUsers = users.map((user) => user.toObject());
    renderUsers.sort((a, b) => b.tokenFromRef - a.tokenFromRef);

    // Kiểm tra xem có query parameter 'address' được cung cấp không
    const specificAddress = req.body.address;

    let specificUser = null;
    if (specificAddress) {
      // Tìm người dùng cụ thể dựa vào 'address'
      specificUser = renderUsers.find(
        (user) => user.address === specificAddress
      );
    }

    // Trả về cả danh sách người dùng và người dùng cụ thể (nếu tìm thấy)
    res.json({
      allUsers: renderUsers,
      specificUser: specificUser || "User not found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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

app.post("/api/log", (req, res) => {
  const { tag, message } = req.body;
  const timestamp = new Date().toISOString();
  const formattedMessage = `${timestamp}: [${tag}] ${message}\n`;

  fs.appendFile(path.join(__dirname, "log.log"), formattedMessage, (err) => {
    if (err) {
      console.error("Error writing to log file", err);
      return res.status(500).send("Error writing to log file");
    }
    res.send("Log written successfully");
  });
});

app.get("/readLog", (req, res) => {
  const logFilePath = path.join(__dirname, "log.log");
  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading log file");
      return;
    }
    res.send(`<pre>${data}</pre>`);
  });
});

app.get("/kol/:name", async (req, res) => {
  const kolName = req.params.name;
  const ipAddress = req.ip;
  const timestamp = new Date();

  const existingVisit = await model.visitModel.findOne({ kolName, ipAddress });

  if (!existingVisit) {
    const newVisit = new model.visitModel({ kolName, ipAddress, timestamp });
    await newVisit.save();
    console.log(`New visit logged for ${kolName} from IP: ${ipAddress}`);
  } else {
    console.log(
      `Repeat visit from IP: ${ipAddress} for ${kolName} - not logged.`
    );
  }

  res.redirect("https://metafruit.pro");
});

app.get("/dashboard/kol", async (req, res) => {
  try {
    const visits = await model.visitModel.aggregate([
      {
        $group: {
          _id: "$kolName",
          totalVisits: { $count: {} },
        },
      },
      {
        $sort: { totalVisits: -1 },
      },
    ]);

    res.render("dashboard", { visits });
  } catch (error) {
    console.error("Error fetching KOL visit data:", error);
    res.status(500).send("An error occurred while fetching KOL visit data.");
  }
});

app.listen(port, () => {
  console.log("Server running on port 3001");
});
