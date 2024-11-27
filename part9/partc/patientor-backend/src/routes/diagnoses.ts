import express from "express";
import diagnosesService from "../services/diagnosesService";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: Diagnosis[] = diagnosesService.getEntries();
  res.json(data);
});

export default router;
