import User from "../models/User.js"
import bcrypt from "bcrypt"
import joi from "joi"

export const signup = async (req, res) => {
    try {
        const {error: validationError} = validateUser(req.body);

        if (validationError){
            const error = new Error(validationError.details[0].message);
            return res.status(400).json({
                success: false,
                message: error,
            })
        }

        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await user.save();
        
        return res.status(201).json({
            success: true,
            message: "Account Created Successfully.",
            user: savedUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = register;

function validateUser(data){
    const userSchema = joi.object({
        name: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(12).required(),
    })

    return userSchema.validate(data);
}