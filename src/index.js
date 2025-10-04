import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/database.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => { 
    app.listen(port, (error) => {
      if (error) {
        console.log("Error making the server");
      } else {
        console.log(`Server running on : "http://localhost:${port}"`);
      }
    });
  })
  .catch((error) => {
    console.error("MongoDb connection error : ", error);
    process.exit(); 
  });
