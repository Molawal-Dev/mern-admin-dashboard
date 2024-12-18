import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    // Convert `id` to a MongoDB ObjectId
    const userId = new mongoose.Types.ObjectId(id);

    const userWithStats = await User.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" }, // This will remove entries without affiliateStats
    ]);

    // Check if userWithStats contains a result
    if (!userWithStats.length) {
      return res.status(404).json({ message: "User not found or no affiliate stats." });
    }

    // Check if affiliateStats exists on the user
    if (!userWithStats[0].affiliateStats) {
      return res.status(404).json({ message: "No affiliate stats available for this user." });
    }

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

