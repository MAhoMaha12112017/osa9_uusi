import express from "express";
import patientServices from "../services/patientServices";
import { toNewPatientEntry, toNewHEntry } from "../utils";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  // Entry,
  NewEntry,
  Patient,
} from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientServices.getNonSensitivePatientEntries());
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient: Patient | undefined = patientServices.getPatientById(
      req.params.id
    );
    if (!patient) {
      res.status(404).end();
    } else {
      const newHEntry: NewEntry | undefined = toNewHEntry(req.body);
      if (newHEntry) {
        const addedEntry: Patient = patientServices.addEntry(
          newHEntry,
          patient
        );
        res.json(addedEntry);
      } else {
        res.status(400).end();
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry: NewPatientEntry = toNewPatientEntry(req.body);
    const newPatient: NonSensitivePatientEntry = patientServices.addPatient(
      newPatientEntry
    );
    res.json(newPatient);
  } catch (error) {
    console.log(error);
  }

  // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const { name, dateOfBirth, ssn, gender, occupation }: NewPatientEntry = req.body;
  // // const newPatientEntry = toNewPatientEntry(req.body);
  // const newPatient: NonSensitivePatientEntry = patientServices.addPatient({ name, dateOfBirth, ssn, gender, occupation });
  // res.json(newPatient);
});

router.get("/:id", (req, res) => {
  const patient = patientServices.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).end();
  }
});

export default router;
