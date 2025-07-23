import { useState, memo } from "react";
import { validatePlayerForm } from "../../utils/helpers";

interface PlayerFormProps {
  onSubmit: (playerData: { name: string; score: number }) => void;
  onCancel: () => void;
  loading?: boolean;
}

interface FormErrors {
  name?: string;
  score?: string;
}

const PlayerForm = memo(
  ({ onSubmit, onCancel, loading = false }: PlayerFormProps) => {
    const [formData, setFormData] = useState({ name: "", score: "" });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const handleSubmit = () => {
      const errors: FormErrors = validatePlayerForm(formData);

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      onSubmit({
        name: formData.name.trim(),
        score: parseInt(formData.score),
      });

      setFormData({ name: "", score: "" });
      setFormErrors({});
    };

    const handleCancel = () => {
      setFormData({ name: "", score: "" });
      setFormErrors({});
      onCancel();
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Add New Player</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Player Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter player name"
              disabled={loading}
              autoFocus
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Score
            </label>
            <input
              type="number"
              value={formData.score}
              onChange={(e) =>
                setFormData({ ...formData, score: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.score ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter initial score"
              min="0"
              max="999999"
              disabled={loading}
            />
            {formErrors.score && (
              <p className="text-red-500 text-sm mt-1">{formErrors.score}</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="!bg-blue-500 text-white px-4 py-2 rounded hover:!bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Player"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="!bg-gray-500 text-white px-4 py-2 rounded hover:!bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default PlayerForm;
