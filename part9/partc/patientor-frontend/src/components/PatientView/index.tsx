import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";

const PatientView = () => {
  const match = useMatch("/patients/:id");
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(
        match?.params.id as string,
      );
      setPatient(patient);
      console.log(patient);
    };
    fetchPatient();
  }, [match]);

  if (!patient) {
    return <div>Not found</div>;
  }
  return (
    <div>
      <h1>{patient.name}</h1>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Gender: {patient.gender}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>Entries: {patient.entries.length}</p>
    </div>
  );
};

export default PatientView;
