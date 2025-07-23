import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import apiService from "../services/apiService";
import type { Player } from "../types/Player";

// Async Thunks for API calls
export const fetchLeaderboard = createAsyncThunk(
  "players/fetchLeaderboard",
  async () => {
    return await apiService.getLeaderboard();
  }
);

export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async () => {
    return await apiService.getAllPlayers();
  }
);

export const addPlayer = createAsyncThunk(
  "players/addPlayer",
  async (playerData: { name: string; score: number }) => {
    return await apiService.createPlayer(playerData);
  }
);

export const updatePlayerScore = createAsyncThunk(
  "players/updatePlayerScore",
  async ({ playerId, score }: { playerId: Player["id"]; score: number }) => {
    // The API returns the updated player, which we'll use to update the state
    return await apiService.updatePlayerScore(playerId, score);
  }
);

export const deletePlayer = createAsyncThunk(
  "players/deletePlayer",
  async (playerId: Player["id"]) => {
    await apiService.deletePlayer(playerId);
    // Return the ID to identify which player to remove from the state
    return playerId;
  }
);

interface PlayersState {
  players: Player[];
  leaderboard: Player[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PlayersState = {
  players: [],
  leaderboard: [],
  status: "idle",
  error: null,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<PlayersState>) => {
    builder
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaderboard = action.payload;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.players = action.payload;
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPlayers = [...state.players, action.payload].sort(
          (a, b) => b.score - a.score
        );
        state.players = updatedPlayers;
        state.leaderboard = updatedPlayers.slice(0, 10);
      })
      .addCase(updatePlayerScore.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPlayer = action.payload;
        const updatedPlayers = state.players
          .map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
          .sort((a, b) => b.score - a.score);
        state.players = updatedPlayers;
        state.leaderboard = updatedPlayers.slice(0, 10);
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPlayers = state.players.filter(
          (p) => p.id !== action.payload
        );
        state.players = updatedPlayers;
        state.leaderboard = updatedPlayers.slice(0, 10);
      })
      // Generic cases for pending and rejected states
      .addMatcher(
        isPending(
          fetchLeaderboard,
          fetchPlayers,
          addPlayer,
          updatePlayerScore,
          deletePlayer
        ),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(
          fetchLeaderboard,
          fetchPlayers,
          addPlayer,
          updatePlayerScore,
          deletePlayer
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Something went wrong";
        }
      );
  },
});

export const { clearError } = playersSlice.actions;

export default playersSlice.reducer;
