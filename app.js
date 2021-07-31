const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const postRoutes = require("./routes/appointment.js");
const contactRoutes = require("./routes/contact.js");

const razorpay = new Razorpay({
  key_id: "rzp_test_iy0Rqq8BWgZAGy",
  key_secret: "MAvpOo4XAGnGTmNzMI0s9uRS",
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PostMessage = require("./models/postMessage.js");
const ContactModel = require("./models/ContactModel.js");
// razorpay post
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

// appointment post
app.post("/appointment", async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  console.log(req.body);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// appointment get
app.get("/appointment", async (req, res) => {
  try {
    const PostMessages = await PostMessage.find();
    res.status(200).json(PostMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// contact post
app.post("/contact", async (req, res) => {
  const contact = req.body;

  const newContact = new ContactModel(contact);

  console.log(req.body);

  try {
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// contact get
app.get("/contact", async (req, res) => {
  try {
    const ContactModel = await ContactModel.find();
    res.status(200).json(ContactModel);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
    // () => (module.exports.handler = serverless(app))

    app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
