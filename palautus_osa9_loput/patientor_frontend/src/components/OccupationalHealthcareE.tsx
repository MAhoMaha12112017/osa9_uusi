import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Icon, Container, Divider } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";

const OccupationalHealthcareE: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue(); // { patients }

  const getDiagnoseRow = (dc: string) => {
    const result: Diagnosis | undefined = diagnosis.find(
      ({ code }) => code === dc
    );
    // console.log("result", result);
    if (result) {
      return (
        <li key={dc}>
          {dc} {result.name}
        </li>
      );
    }
    return <li key={dc}>{dc}</li>;
  };

  return (
    <Container key={entry.id}>
      <p>
        {entry.date} <Icon name="user doctor" size="large" />{" "}
      </p>
      <p>{entry.description}</p>
      {entry.diagnosisCodes ? (
        <ul>{entry.diagnosisCodes.map((dc: string) => getDiagnoseRow(dc))}</ul>
      ) : null}
      {entry.sickLeave ? (
        <p>
          Sickleave: from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </p>
      ) : null}
      <Divider />
    </Container>
  );
};

export default OccupationalHealthcareE;
