import { Diagnose } from '../types'; 
import diagnosesData from '../data/diagnoses.json';

const diagnoses: Diagnose[] = diagnosesData as Diagnose[];

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};