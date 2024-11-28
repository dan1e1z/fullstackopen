import express from "express";
import patientsService from "../services/patientsService";
import { NonSensitivePatientEntry, Patient, NewPatientEntry } from "../types";

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
  };
  const addedPatient = patientsService.addPatient(newPatientEntry);
  res.json(addedPatient);
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
