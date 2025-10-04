import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
const healthCheck = (req, res) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, { message: "SERVER RUNNING SUCCESSFULLY " }));
  } catch (error) {
    console.log("Error , running the server ", error);
  }
};
*/

const healthCheck = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, { message: "Server is running  Successfully" }));
});
export { healthCheck };
