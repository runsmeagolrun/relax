import type { Player } from "../types/Player";

const API_BASE_URL = "http://localhost:3001/api";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

class ApiService {
  async makeRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data: ApiResponse<T> = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Request failed");
      }

      return data.data;
    } catch (error: unknown) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          "Unable to connect to server. Please check if the server is running."
        );
      }
      throw error;
    }
  }

  async getLeaderboard(): Promise<Player[]> {
    return this.makeRequest<Player[]>("/leaderboard");
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.makeRequest<Player[]>("/players");
  }

  async createPlayer(playerData: {
    name: string;
    score: number;
  }): Promise<Player> {
    return this.makeRequest<Player>("/players", {
      method: "POST",
      body: JSON.stringify(playerData),
    });
  }

  async updatePlayerScore(
    playerId: Player["id"],
    score: number
  ): Promise<Player> {
    return this.makeRequest<Player>(`/players/${playerId}`, {
      method: "PUT",
      body: JSON.stringify({ score }),
    });
  }

  async deletePlayer(playerId: Player["id"]): Promise<Player> {
    return this.makeRequest<Player>(`/players/${playerId}`, {
      method: "DELETE",
    });
  }
}

export default new ApiService();
