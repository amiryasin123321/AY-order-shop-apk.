const express = require('express');
const app = express();
app.use(express.json());

// Mock database for user balances
let userBalances = {};

// Endpoint to add balance to a user's account
app.post("/api/addBalance", (req, res) => {
    console.log("Request Body:", req.body); // Log the request body
    const { userId, amount } = req.body;

    if (!userId || !amount) {
        return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Initialize or update the user's balance
    if (!userBalances[userId]) {
        userBalances[userId] = 0;
    }
    userBalances[userId] += parseFloat(amount);

    res.json({ success: true, balance: userBalances[userId] });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});