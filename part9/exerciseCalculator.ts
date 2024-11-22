interface Exercise {
  numberOfDays: number;
  numberOfTrainingDays: number;
  originalTargetValue: number;
  calculatedAverageTime: number;
  targetReached: boolean;
  ratingScore: number;
  ratingExplanation: string;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number,
): Exercise => {
  const numberOfDays = dailyExerciseHours.length;
  const numberOfTrainingDays = dailyExerciseHours.filter(
    (hours) => hours > 0,
  ).length;
  const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
  const calculatedAverageTime = totalHours / numberOfDays;
  const targetReached = calculatedAverageTime >= targetAmount;

  let ratingScore: number;
  let ratingExplanation: string;

  if (calculatedAverageTime >= targetAmount) {
    ratingScore = 3;
    ratingExplanation = "Great job! You met or exceeded the target.";
  } else if (calculatedAverageTime >= targetAmount * 0.75) {
    ratingScore = 2;
    ratingExplanation = "Not bad, but there's room for improvement.";
  } else {
    ratingScore = 1;
    ratingExplanation = "You need to train more to meet your target.";
  }

  return {
    numberOfDays,
    numberOfTrainingDays,
    originalTargetValue: targetAmount,
    calculatedAverageTime,
    targetReached,
    ratingScore,
    ratingExplanation,
  };
};

// Example usage
const dailyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
const targetAmount = 2;
const result = calculateExercises(dailyExerciseHours, targetAmount);
console.log(result);
