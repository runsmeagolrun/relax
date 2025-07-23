import { useState, memo } from "react";
import type { KeyboardEvent, FC } from "react";
import { Pencil, Check, X, Trash2 } from "lucide-react";
import { formatDate, validateScore } from "../../utils/helpers";
import type { Player } from "../../types/Player";

interface AdminTableProps {
  players: Player[];
  onUpdateScore: (playerId: Player["id"], newScore: number) => void;
  onDeletePlayer: (playerId: Player["id"]) => void;
}

const AdminTable: FC<AdminTableProps> = memo(
  ({ players, onUpdateScore, onDeletePlayer }) => {
    const [editingPlayer, setEditingPlayer] = useState<Player["id"] | null>(
      null
    );
    const [tempScore, setTempScore] = useState("");

    const handleEditStart = (player: Player) => {
      setEditingPlayer(player.id);
      setTempScore(player.score.toString());
    };

    const handleEditSave = (playerId: Player["id"]) => {
      const newScore = parseInt(tempScore);

      if (!validateScore(newScore)) {
        alert("Score must be a number between 0 and 999,999");
        return;
      }

      onUpdateScore(playerId, newScore);
      setEditingPlayer(null);
      setTempScore("");
    };

    const handleEditCancel = () => {
      setEditingPlayer(null);
      setTempScore("");
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLInputElement>,
      playerId: Player["id"]
    ) => {
      if (event.key === "Enter") {
        handleEditSave(playerId);
      } else if (event.key === "Escape") {
        handleEditCancel();
      }
    };

    const handleDelete = (playerId: Player["id"]) => {
      if (window.confirm("Are you sure you want to delete this player?")) {
        onDeletePlayer(playerId);
      }
    };

    if (players.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600">No players found</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player) => (
              <tr key={player.id}>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {player.name}
                  </div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {editingPlayer === player.id ? (
                    <input
                      type="number"
                      value={tempScore}
                      onChange={(e) => setTempScore(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, player.id)}
                      className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="999999"
                      autoFocus
                    />
                  ) : (
                    <div className="text-sm font-bold text-blue-600">
                      {player.score.toLocaleString()}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                  {formatDate(player.lastUpdated)}
                </td>
                <td className="px-6 py-4 text-center justify-items-center whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    {editingPlayer === player.id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(player.id)}
                          className="text-green-600 hover:text-green-900 rounded-lg border border-transparent py-2.5 px-4 text-base font-medium bg-gray-800 cursor-pointer transition-colors duration-200"
                          title="Save changes"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="text-gray-600 hover:text-gray-900 rounded-lg border border-transparent py-2.5 px-4 text-base font-medium bg-gray-800 cursor-pointer transition-colors duration-200"
                          title="Cancel edit"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEditStart(player)}
                        className="text-blue-600 hover:text-blue-900 rounded-lg border border-transparent py-2.5 px-4 text-base font-medium bg-gray-800 cursor-pointer transition-colors duration-200"
                        title="Edit score"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="text-red-600 hover:text-red-900 rounded-lg border border-transparent py-2.5 px-4 text-base font-medium bg-gray-800 cursor-pointer transition-colors duration-200"
                      title="Delete player"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

export default AdminTable;
