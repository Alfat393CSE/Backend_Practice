import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { sendMail } from "../utils/mail.js";


const registerUser = asyncHandler(async (req, res) => {
    const {email, name, password, role} = req.body

    const existedUser = await User.findById(
        
    )
    
})