import serverless from "serverless-http";
import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import Razorpay from "razorpay";
import shortid from "shortid";
import postRoutes from "./routes/appointment.js";
import contactRoutes from "./routes/contact.js";

const razorpay = new Razorpay({
  key_id: "rzp_test_iy0Rqq8BWgZAGy",
  key_secret: "MAvpOo4XAGnGTmNzMI0s9uRS",
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/appointment", postRoutes);
app.use("/Contact", contactRoutes);

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 500;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("hello word");
});

const CONNECTION_URL =
  "mongodb+srv://nutritional-portal:nutritional-portal123@cluster1.t8urf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => (module.exports.handler = serverless(app))

    // app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
