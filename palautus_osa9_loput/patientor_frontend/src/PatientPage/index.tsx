import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PatientData, HealthCheckEntry } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Icon, Container, Header, Button } from "semantic-ui-react";
import { updatePatient } from "../state/reducer";
import AddPatientEntryModal from "../AddPatientEntryModal/index";
import { PatientEntryFormValues } from "../AddPatientEntryModal/AddPatientEntryForm";
import Entries from "../components/Entries";

const PatientPage: React.FC = () => {
  const [, dispatch] = useStateValue(); // { patients }
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const [currentPatient, setCurrentPatient] = React.useState<
    PatientData | undefined
  >();

  const id = useParams<{ id: string }>().id;

  useEffect(() => {
    const getPatientData = async (id: string) => {
      try {
        // testi ei toimi, pitänee siirtää tuohon loppuun?  // nyt hakee joka kerta tiedot uudelleen
        if (!currentPatient || currentPatient.id !== id) {
          // if (currentPatient && currentPatient.entries.length > 0) {
          //   return;
          // }
          const { data } = await axios.get<PatientData>(
            `${apiBaseUrl}/patients/${id}`
          );
          // console.log("haku");
          // console.log("data", data);
          setCurrentPatient(data);
          dispatch(updatePatient(data));
          // dispatch({ type: "UPDATE_PATIENT", payload: data });
        }
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };
    getPatientData(id);
  }, [currentPatient, id, dispatch]);

  if (!currentPatient) {
    return <div>ei patienttia</div>;
  }

  const submitNewPatientEntry = async (values: PatientEntryFormValues) => {
    try {
      const { data: newPatientEntry } = await axios.post<HealthCheckEntry>(
        `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
        values
      );
      console.log("newPatientEntry", newPatientEntry);
      const patientToUpdate = { ...currentPatient };
      patientToUpdate.entries = patientToUpdate.entries.concat(newPatientEntry);
      // varmasti parempikin ja helpompikin tapa saada päivittymään kuin tietokantahaku, mutta olkoot, kun ei onnistunut muutn
      dispatch(updatePatient(patientToUpdate));
      const { data } = await axios.get<PatientData>(
        `${apiBaseUrl}/patients/${id}`
      );
      // console.log("haku");
      // console.log("data", data);
      setCurrentPatient(data);
      // setCurrentPatient(patientToUpdate);
      // console.log("patientToUpdate", patientToUpdate);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <>
      <Container>
        <Header as="h1">
          {currentPatient.name}
          {currentPatient.gender === "male" ? (
            <Icon name="mars" size="small" />
          ) : currentPatient.gender === "female" ? (
            <Icon name="venus" size="small" />
          ) : (
            <Icon name="neuter" size="small" />
          )}
        </Header>
        <p>ssn: {currentPatient.ssn}</p>
        <p>occupation: {currentPatient.occupation}</p>
      </Container>
      <Entries entries={currentPatient.entries} />
      <AddPatientEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatientEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient Entry</Button>
    </>
  );
};

export default PatientPage;
