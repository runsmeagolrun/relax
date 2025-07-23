const express = require("express");
const {
  validatePlayer,
  validateScoreUpdate,
  handleValidationErrors,
} = require("../middleware/validation");
const {
  getLeaderboard,
  getAllPlayers,
  createPlayer,
  updatePlayerScore,
  deletePlayer,
  healthCheck,
} = require("../controllers/playerController");

const router = express.Router();

// GET /api/leaderboard - Get top 10 players
router.get("/leaderboard", getLeaderboard);

// GET /api/players - Get all players (for admin)
router.get("/players", getAllPlayers);

// POST /api/players - Add new player
router.post("/players", validatePlayer, handleValidationErrors, createPlayer);

// PUT /api/players/:id - Update player score
router.put(
  "/players/:id",
  validateScoreUpdate,
  handleValidationErrors,
  updatePlayerScore
);

// DELETE /api/players/:id - Delete player
router.delete("/players/:id", deletePlayer);

// Health check endpoint
router.get("/health", healthCheck);

module.exports = router;
