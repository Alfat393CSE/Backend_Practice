import { ApiResponse } from "../utils/api-response.js";

const healthCheck = (req, res) => {
  try {
    res.status(200).json(new ApiResponse(200, "server is running on practice no 8"));
  } catch (error) {}
};

export { healthCheck };
