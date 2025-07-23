import { memo } from "react";
import { formatDate, getRankIcon } from "../../utils/helpers";
import type { Player } from "../../types/Player";

interface LeaderboardTableProps {
  players: Player[];
}

const LeaderboardTable = memo(({ players }: LeaderboardTableProps) => {
  if (players.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No players found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Player
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {players.map((player, index) => (
            <tr key={player.id} className={index < 3 ? "bg-yellow-50" : ""}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-base font-bold">
                  {getRankIcon(index + 1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {player.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-bold text-blue-600">
                  {player.score.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(player.lastUpdated)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default LeaderboardTable;
