/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatientEntry,
  Gender,
  // Entry,
  // EntryType,
  type,
  HealthCheckRating,
  NewEntry,
} from "./types"; //  EntryType, Patient

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (value: any): value is number => {
  return typeof value === "number";
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseStringValue = (sValue: any, type: string): string => {
  if (!sValue || !isString(sValue)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing ${type}: ${sValue}`);
  }
  return sValue;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isArrayOfStrings = (arr: any) => {
  if (Array.isArray(arr)) {
    if (arr.every((i) => typeof i === "string")) {
      return arr as string[];
    }
  }
  return [];
};

const parseGenderValue = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (healthCheckRating: any): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing rating: ${healthCheckRating}`);
  }
  return healthCheckRating;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseCodes = (diagnosisCodes: any): string[] => {
  if (isArrayOfStrings(diagnosisCodes)) {
    return isArrayOfStrings(diagnosisCodes);
  } else {
    throw new Error(`Incorrect or missing diagnosisCodes: ${diagnosisCodes}`);
  }
};

const isEntryType = (param: any): param is type => {
  return ["Hospital", "HealthCheck", "OccupationalHealthcare"].includes(param);
};

const parseEntryTypeValue = (type: type): type => {
  if (!type || !isEntryType(type)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  // console.log('toNewPatientEntry - object', object);
  return {
    name: parseStringValue(object.name, "name"),
    ssn: parseStringValue(object.ssn, "ssn"),
    gender: parseGenderValue(object.gender),
    occupation: parseStringValue(object.occupation, "occupation"),
    dateOfBirth: parseDate(object.dateOfBirth),
    entries: [], //parseEntries(object.entries)
  };
};

export const toNewHEntry = (objectX: any): NewEntry | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const entryType: type = parseEntryTypeValue(objectX.type);
  switch (entryType) {
    case "HealthCheck":
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: entryType, //type: objectX.type,
        description: parseStringValue(objectX.description, "description"),
        date: parseDate(objectX.date),
        specialist: parseStringValue(objectX.specialist, "specialist"),
        healthCheckRating: parseRating(objectX.healthCheckRating),
        diagnosisCodes: parseCodes(objectX.diagnosisCodes),
      };
      break;
    case "OccupationalHealthcare":
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: entryType, //type: objectX.type,
        description: parseStringValue(objectX.description, "description"),
        date: parseDate(objectX.date),
        specialist: parseStringValue(objectX.specialist, "specialist"),
        employerName: parseStringValue(objectX.employerName, "employerName"),
        diagnosisCodes: parseCodes(objectX.diagnosisCodes),
      };
      break;
    case "Hospital":
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: entryType, //type: objectX.type,
        description: parseStringValue(objectX.description, "description"),
        date: parseDate(objectX.date),
        specialist: parseStringValue(objectX.specialist, "specialist"),
        diagnosisCodes: parseCodes(objectX.diagnosisCodes),
      };
      break;
    default:
      return assertNever(entryType); //return undefined;
  }
  // const returnObject = {
  //   type: parseEntryTypeValue(object.type),
  //   description: parseStringValue(object.description, "description"),
  //   date: parseDate(object.date),
  //   specialist: parseStringValue(object.specialist, "specialist"),
  //   healthCheckRating: parseRating(object.healthCheckRating),
  // };
  // console.log("toNewHEntryssä", object.type, EntryType.HealthCheck);
  // if (object.type === EntryType.HealthCheck) {
  // returnObject.healthCheckRating = parseRating(object.healthCheckRating);
  // return returnObject;
  // }
};
// const isType = (param: any): param is EntryType => {
//   return Object.values(EntryType).includes(param);
// };

// const parseTypeValue = (type: string): string => {
//   if (
//     !type ||
//     !isString(type) ||
//     !["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(type) ||
//     !isType(type)
//   ) {
//     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//     throw new Error(`Incorrect or missing ${type}`);
//   }
//   return type;
// };
