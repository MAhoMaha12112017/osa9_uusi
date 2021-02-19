/* eslint-disable @typescript-eslint/no-unsafe-call */
import { v1 as uuid } from "uuid";
import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  // Entry,
  NewEntry,
} from "../types";
import patientsData from "../data/patients";
// import { checkPatient } from '../utils';

const patients: Patient[] = patientsData; // as Patient[];

const getPatients = (): Patient[] => {
  // patients.map(p => checkPatient(p.entry))
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatientEntry => {
  const newPatient = {
    ...entry,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: uuid(),
  };
  patients.push(newPatient);
  return getNonSensitivePatientEntry(newPatient);
};

const addEntry = (newHEntry: NewEntry, patient: Patient): Patient => {
  const newEntry = {
    ...newHEntry,
    id: uuid(),
  };
  patient.entries.push(newEntry);
  console.log(newEntry);
  return patient;
};

const getNonSensitivePatientEntry = ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
}: Patient): NonSensitivePatientEntry => {
  return { id, name, dateOfBirth, gender, occupation };
};

const getPatientById = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patients.find((p) => p.id === id);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
  getPatientById,
  addEntry,
};
