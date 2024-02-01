import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";
import colors from "colors";

(async () => {
  try {
    const connectDB = await mongoose.connect(config.MONGODB_URL);
    console.log(
      `Connected to MongoDB ${connectDB.connection.host}`.bgMagenta.white
    );
    app.on("error", (error) => {
      console.log("Error:", error);
      throw error;
    });
    const PORT = config.PORT;
    // listening
    app.listen(PORT, () => {
      console.log(`App is running at PORT ${PORT}`.bgBlue.white);
    });
  } catch (error) {
    console.log(`Error in connecting with Database ${error}`.bgRed.white);
  }
})();
