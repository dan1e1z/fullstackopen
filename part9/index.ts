import express from "express";
import { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req: Request, res: Response): void => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
