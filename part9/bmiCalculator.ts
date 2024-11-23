const calculateBmi = (height: number, weight: number): string => {
  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);

  if (bmi >= 30) {
    return "Obese";
  } else if (bmi >= 25) {
    return "Overweight";
  } else if (bmi >= 18.5) {
    return "Normal Range";
  } else {
    return "Underweight";
  }
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

if (isNaN(height) || isNaN(weight)) {
  console.error("Both height and weight must be valid numbers.");
  process.exit(1);
}

console.log(calculateBmi(height, weight));
