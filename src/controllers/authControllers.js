import User from "../models/userSchema.js";

// cookie options
export const cookieOptions = {
  expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const signUp = async (req, res) => {
  try {
    // destructure
    const { name, email, password, phone, address } = req.body;
    // validation
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    // check if the user exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists, please login",
      });
    }
    // create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
    });
    // token
    const token = user.getJWTtoken();
    // safety
    user.password = undefined;
    // store this token in user's cookie
    res.cookie("token", token, cookieOptions);
    // response to user
    res.status(200).json({
      success: true,
      message: "User signUp successfully",

      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in signing up",
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, Please sign up first",
      });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = user.getJWTtoken();
    // flush out the password
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User has been logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {}
  console.log(error);
  res.status(500).json({
    success: false,
    message: "Error in signing up",
    error,
  });
};
