import User from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import generateId from "../utils/generateId.js";
import { sendEmail } from "../configs/mail.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const tournamentId = generateId()

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            tournamentId
        })

        const mailSent =
            await sendEmail(
                user.email,
                "Tournament Registered 🎉",
                `Hello ${user.name},

                Thank you for using CricBid!

                Your Tournament ID: ${user.tournamentId}

                You can now login and start your auction.

                Best of luck 🔥`
            );

        console.log(
            "Mail status:",
            mailSent
        );

        res.status(201).json({
            success: true,
            message: "Signup successful",
            user,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({ message: "Login Successful.", token, user })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}