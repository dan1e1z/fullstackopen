import express from "express";
import { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, Exercise } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req: Request, res: Response): void => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response): void => {
  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
  const bmi: string = calculateBmi(height, weight);

  if (
    req.query.weight == null ||
    req.query.height == null ||
    isNaN(weight) ||
    isNaN(height)
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  res.json({
    weight: weight,
    height: height,
    bmi: bmi,
  });
});

app.post("/exercises", (req: Request, res: Response): void => {
  const { daily_exercises, target } = req.body;
    console.log(req.body)
  console.log(daily_exercises);
  console.log(target);

  if (!daily_exercises || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((hours) => isNaN(Number(hours))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const target_number: number = Number(target);
  const exercises: number[] = daily_exercises.map(Number);
  const result: Exercise = calculateExercises(exercises, target_number);
  res.json(result);
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
