const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoURI =
  "mongodb+srv://jauvalue:Tby5VZdwtU9GGaJw@cluster0.pi9vv.mongodb.net/jay?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

// Define schemas and models

// Company Schema and Model
const companySchema = new mongoose.Schema({
  symbol: { type: String },
  name: { type: String },
  currency: { type: String, required: true },
  stockExchange: { type: String },
  exchangeShortName: { type: String },
});

const Company = mongoose.model("Companies", companySchema);

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware to hash passwords before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = mongoose.model("users", userSchema);

// Routes

// Route to get companies with pagination
app.get("/api/companies", async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 30;
  const skip = parseInt(req.query.skip, 10) || 0;

  try {
    const companies = await Company.find().limit(limit).skip(skip);
    res.json(companies);
  } catch (error) {
    console.error("Failed to fetch companies:", error.message);
    res.status(500).json({ message: "Failed to fetch companies" });
  }
});

// Route to get all users
// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error("Failed to fetch users:", error.message);
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// });

// Route to handle user registration
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "An error occurred during registration" });
  }
});

// Route to handle user login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message); // Log errors
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// Route to get a user by email
app.get("/api/users/by-email", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email query parameter is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
