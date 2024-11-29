export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}


export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;

    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    Healthy = 1,
    LowRisk = 2,
    HighRisk = 3,
    CriticalRisk = 4
}

export interface SickLeave {
    startDate: string,
    endDate: string,
}


interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;
export type NewPatientEntry = Omit<Patient, "id">;
