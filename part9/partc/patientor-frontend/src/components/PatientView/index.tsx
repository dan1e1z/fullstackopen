import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

const PatientView = () => {

console.log("PatientView")
  const match = useMatch("/patients/:id");
  const [patient, setPatient] = useState<Patient>();
const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
            console.log('PatientView params id', match?.params.id)
      const patient = await patientService.getPatient(
        match?.params.id as string,
      );
      console.log(patient);
      setPatient(patient);
    };
     const fetchDiagnoses = async () => {
        const diagnoses = await diagnosisService.getAll();
      console.log(diagnoses);
        setDiagnoses(diagnoses);
    }

    fetchPatient();
    fetchDiagnoses();

  }, [match]);

  if (!patient) {
    return <div>Not found</div>;
  }

const getDiagnosisName = (code: string) => {
        const diagnosis = diagnoses
        .find((diagnosis) => diagnosis.code === code);
        return diagnosis ? diagnosis.name : "";
    };

  return (
<div>
  <h1>{patient.name}</h1>
  <p>SSN: {patient.ssn}</p>
  <p>Occupation: {patient.occupation}</p>
  <p>Gender: {patient.gender}</p>
  <p>Date of Birth: {patient.dateOfBirth}</p>
    <h2>Entries</h2> 
            {patient.entries.map((entry, index) => (
    <div key={index}>
      <p>
        Date: {entry.date} <br />
        Description: {entry.description}
      </p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code, i) => (
            <li key={i}>{code} {getDiagnosisName(code)}</li>
          ))}
        </ul>
      )}
    </div>
  ))}
</div>
  );
};

export default PatientView;
