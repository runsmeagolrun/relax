export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getRankIcon = (rank: number): string => {
  if (rank === 1) return "🏆";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};

interface PlayerFormData {
  name: string;
  score: string;
}

interface FormErrors {
  name?: string;
  score?: string;
}

export const validatePlayerForm = (data: PlayerFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length > 50) {
    errors.name = "Name must be 50 characters or less";
  } else if (!/^[a-zA-Z0-9\s]+$/.test(data.name.trim())) {
    errors.name = "Name can only contain letters, numbers, and spaces";
  }

  if (!data.score.trim()) {
    errors.score = "Score is required";
  } else {
    const scoreValue = Number(data.score);
    if (
      isNaN(scoreValue) ||
      !Number.isInteger(scoreValue) ||
      scoreValue < 0 ||
      scoreValue > 999999
    ) {
      errors.score = "Score must be a whole number between 0 and 999,999";
    }
  }

  return errors;
};

export const validateScore = (score: number): boolean => {
  return !isNaN(score) && score >= 0 && score <= 999999;
};
