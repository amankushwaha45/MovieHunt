const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const memoryUsers = global.__movieHuntUsers || (global.__movieHuntUsers = []);
const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const findUserByEmail = async (email) => {
  const normalizedEmail = normalizeEmail(email);

  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (user) return user;
  } catch (error) {
    
  }

  return memoryUsers.find((user) => user.email === normalizedEmail) || null;
};

const createUserRecord = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    const fallbackUser = {
      _id: `${Date.now()}-${memoryUsers.length + 1}`,
      ...userData,
      role: userData.role || "user",
    };
    memoryUsers.push(fallbackUser);
    return fallbackUser;
  }
};

const updateUserRecord = async (user, updates) => {
  try {
    Object.assign(user, updates);
    await user.save();
    return user;
  } catch (error) {
    const existingUser = memoryUsers.find((item) => item._id?.toString() === user._id?.toString());
    if (existingUser) {
      Object.assign(existingUser, updates);
      return existingUser;
    }
    return user;
  }
};

const sendAuthResponse = (res, user, statusCode = 200) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET || "movie-hunt-secret",
    {
      expiresIn: "7d",
    }
  );

  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role || "user",
  };

  res.status(statusCode).json({
    success: true,
    message: "Authentication successful",
    token,
    user: safeUser,
  });
};



const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUserRecord({
      name,
      email: normalizeEmail(email),
      password: hashedPassword,
    });

    sendAuthResponse(res, user, 201);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await findUserByEmail(email);

    if (!user || !user.password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    sendAuthResponse(res, user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google email is required",
      });
    }

    let user = await findUserByEmail(email);

    if (!user) {
      const fallbackPassword = await bcrypt.hash(`${email}-${Date.now()}`, 10);
      user = await createUserRecord({
        name: name || email.split("@")[0],
        email: normalizeEmail(email),
        password: fallbackPassword,
        googleId: email,
      });
    } else if (!user.googleId) {
      user.googleId = email;
      user.name = user.name || name || email.split("@")[0];
      await updateUserRecord(user, { googleId: email, name: user.name });
    }

    sendAuthResponse(res, user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleAuth,
};