import Player from "../models/PlayerModel.js";

export const addPlayer = async (req, res) => {
    try {
        
        const {name, role, battingStyle, bowlingStyle, address, phone, } = req.body;
        const {tournamentId} = req.params;
        if (!name || !role || !battingStyle || !bowlingStyle || !address || !phone || !tournamentId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const image = req.file ? req.file.path : null;

        const player = await Player.create({
            name,
            role,
            battingStyle,
            bowlingStyle,
            address,
            phone,
            image,
            tournamentId
        })

        return res.status(201).json({ message: "Player added successfully", player });
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const getAllPlayers = async (req, res) => {

    try {
        const { tournamentId } = req.params;
        const players = await Player.find({ tournamentId}).sort({ createdAt: 1 })
        return res.status(200).json({players})
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
        
    }
}