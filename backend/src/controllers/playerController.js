let players = [
  { id: 1, name: "Alice", score: 1500, lastUpdated: new Date().toISOString() },
  { id: 2, name: "Bob", score: 1200, lastUpdated: new Date().toISOString() },
  {
    id: 3,
    name: "Charlie",
    score: 1800,
    lastUpdated: new Date().toISOString(),
  },
  { id: 4, name: "Diana", score: 900, lastUpdated: new Date().toISOString() },
  { id: 5, name: "Eve", score: 2100, lastUpdated: new Date().toISOString() },
];

let nextId = 6;

// Get top 10 players for leaderboard
const getLeaderboard = (req, res) => {
  try {
    const topPlayers = players
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((player) => ({
        id: player.id,
        name: player.name,
        score: player.score,
        lastUpdated: player.lastUpdated,
      }));

    res.json({
      success: true,
      data: topPlayers,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all players (for admin)
const getAllPlayers = (req, res) => {
  try {
    const allPlayers = players
      .sort((a, b) => b.score - a.score)
      .map((player) => ({
        id: player.id,
        name: player.name,
        score: player.score,
        lastUpdated: player.lastUpdated,
      }));

    res.json({
      success: true,
      data: allPlayers,
    });
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Add new player
const createPlayer = (req, res) => {
  try {
    const { name, score } = req.body;

    // Check if player name already exists
    const existingPlayer = players.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (existingPlayer) {
      return res.status(409).json({
        success: false,
        message: "Player name already exists",
      });
    }

    const newPlayer = {
      id: nextId++,
      name: name.trim(),
      score: parseInt(score),
      lastUpdated: new Date().toISOString(),
    };

    players.push(newPlayer);

    res.status(201).json({
      success: true,
      message: "Player created successfully",
      data: newPlayer,
    });
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update player score
const updatePlayerScore = (req, res) => {
  try {
    const playerId = parseInt(req.params.id);
    const { score } = req.body;

    const playerIndex = players.findIndex((p) => p.id === playerId);
    if (playerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    players[playerIndex] = {
      ...players[playerIndex],
      score: parseInt(score),
      lastUpdated: new Date().toISOString(),
    };

    res.json({
      success: true,
      message: "Player score updated successfully",
      data: players[playerIndex],
    });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete player
const deletePlayer = (req, res) => {
  try {
    const playerId = parseInt(req.params.id);

    const playerIndex = players.findIndex((p) => p.id === playerId);
    if (playerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    const deletedPlayer = players.splice(playerIndex, 1)[0];

    res.json({
      success: true,
      message: "Player deleted successfully",
      data: deletedPlayer,
    });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Health check
const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  getLeaderboard,
  getAllPlayers,
  createPlayer,
  updatePlayerScore,
  deletePlayer,
  healthCheck,
};
