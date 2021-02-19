import { State } from "./state";
import { Diagnosis, Patient, PatientData } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: PatientData;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi,
  } as Action;
};

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisListFromApi,
  } as Action;
};

export const updatePatient = (data: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: data,
  } as Action;
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  } as Action;
};

// type: "SET_PATIENT_LIST", payload: patientListFromApi
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: action.payload,
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_PATIENT":
      console.log(
        "UPDATE_PATIENT",
        Object.values(state.patients).find((p) => p.id === action.payload.id)
      );
      // const selectedPatient = Object.values(state.patients).find(p => p.id === action.payload.id);
      // const pats: Patient | PatientData = Object.values(state.patients).map(p => p.id !== action.payload.id ? p : selectedPatient);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};
