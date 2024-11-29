import express from "express";
import patientsService from "../services/patientsService";
import { NonSensitivePatientEntry, Patient, NewPatientEntry } from "../types";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: NonSensitivePatientEntry[] =
    patientsService.getNonSensitiveEntries();
  res.json(data);
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body as Patient;
  const newPatientEntry: NewPatientEntry = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries: []
  };
  const addedPatient = patientsService.addPatient(newPatientEntry);
  res.json(addedPatient);
});

router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  const data = patientsService.getPatient(id); 
  data ? res.json(data) : res.status(404).json({ error: "Patient not found" });
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
