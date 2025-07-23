import { useEffect } from "react";
import { Trophy, RefreshCw } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LeaderboardTable from "../../components/LeaderboardTable/LeaderboardTable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchLeaderboard, clearError } from "../../store/playersSlice";

const LeaderboardPage = () => {
  const dispatch = useAppDispatch();
  const { leaderboard, status, error } = useAppSelector(
    (state) => state.players
  );

  useEffect(() => {
    // Fetch leaderboard if the list is empty when the component mounts.
    if (leaderboard.length === 0) {
      dispatch(fetchLeaderboard());
    }
  }, [dispatch, leaderboard]);

  const handleRefresh = () => {
    dispatch(fetchLeaderboard());
  };

  const handleRetry = () => {
    dispatch(fetchLeaderboard());
  };

  const handleDismissError = () => {
    dispatch(clearError());
  };

  const isLoading = status === "loading";

  if (isLoading && leaderboard.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-4">
          <Trophy className="w-10 h-10 text-yellow-500" />
          Leaderboard
        </h1>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="!bg-blue-500 text-white px-4 py-2 rounded hover:!bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <ErrorMessage
          error={error}
          onRetry={handleRetry}
          onDismiss={handleDismissError}
        />
      )}

      <LeaderboardTable players={leaderboard} />
    </div>
  );
};

export default LeaderboardPage;
