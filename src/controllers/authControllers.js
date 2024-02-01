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
