import express from "express";
import patientsService from "../services/patientsService";
import { NonSensitivePatientEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: NonSensitivePatientEntry[] =
    patientsService.getNonSensitiveEntries();
  res.json(data);
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
