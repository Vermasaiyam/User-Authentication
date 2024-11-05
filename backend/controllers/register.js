import User from "../models/User.js"
import bcrypt from "bcrypt"
import joi from "joi"

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Empty fields!!!",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists.",
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 7);
        await User.create({
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
}

export default register;

function validateUser(data) {
    const userSchema = joi.object({
        name: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(12).required(),
    })

    return userSchema.validate(data);
}