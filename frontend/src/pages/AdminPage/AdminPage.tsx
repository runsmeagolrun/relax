import { useEffect, useState } from "react";
import { Settings, Plus } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PlayerForm from "../../components/PlayerForm/PlayerForm";
import AdminTable from "../../components/AdminTable/AdminTable";
import type { Player } from "../../types/Player";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchPlayers,
  addPlayer,
  updatePlayerScore,
  deletePlayer,
  clearError,
} from "../../store/playersSlice";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { players, status, error } = useAppSelector((state) => state.players);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Fetch players if the list is empty when the component mounts.
    if (players.length === 0) {
      dispatch(fetchPlayers());
    }
  }, [dispatch, players]);

  const handleAddPlayer = async (playerData: {
    name: string;
    score: number;
  }) => {
    dispatch(addPlayer(playerData)).then(() => {
      setShowAddForm(false);
    });
  };

  const handleUpdateScore = (playerId: Player["id"], newScore: number) => {
    dispatch(updatePlayerScore({ playerId, score: newScore }));
  };

  const handleDeletePlayer = (playerId: Player["id"]) => {
    dispatch(deletePlayer(playerId));
  };

  const handleRetry = () => {
    dispatch(fetchPlayers());
  };

  const handleDismissError = () => {
    dispatch(clearError());
  };

  if (status === "loading" && players.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-4">
          <Settings className="w-10 h-10 text-gray-600" />
          Admin Dashboard
        </h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="!bg-green-500 text-white px-4 py-2 rounded hover:!bg-green-600 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Player
        </button>
      </div>

      {error && (
        <ErrorMessage
          error={error}
          onRetry={handleRetry}
          onDismiss={handleDismissError}
        />
      )}

      {showAddForm && (
        <PlayerForm
          onSubmit={handleAddPlayer}
          onCancel={() => setShowAddForm(false)}
          loading={status === "loading"}
        />
      )}

      <AdminTable
        players={players}
        onUpdateScore={handleUpdateScore}
        onDeletePlayer={handleDeletePlayer}
      />
    </div>
  );
};

export default AdminPage;
