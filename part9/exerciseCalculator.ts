interface Exercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number,
): Exercise => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job! You met or exceeded the target.";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better.";
  } else {
    rating = 1;
    ratingDescription = "you need to train more to meet your target.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const args = process.argv.slice(2).map(Number);
const target = args[0];
const dailyExerciseHours = args.slice(1);

if (!target || dailyExerciseHours.some(isNaN)) {
  console.error(
    "Please provide a valid target followed by daily exercise hours. Example: npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4",
  );
  process.exit(1);
}

const result = calculateExercises(dailyExerciseHours, target);
console.log(result);
