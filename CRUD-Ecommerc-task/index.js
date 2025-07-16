// require("dotenv").config();
const express = require("express");
const connectDB = require("./db/dbConnection");

const app = express();
app.use(express.json());
connectDB();

// Routes
app.use("/api/user", require("./src/modules/user/user.route"));
// وهكذا لبقية الراوتس: admin, card ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
