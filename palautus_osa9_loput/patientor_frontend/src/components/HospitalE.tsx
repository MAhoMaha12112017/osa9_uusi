import React from "react";
// import { Entry } from "../types";
import { Icon, Container, Divider } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Diagnosis, HospitalEntry } from "../types";

const HospitalE: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
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
        {entry.date} <Icon name="hospital outline" size="large" />{" "}
      </p>
      <p>{entry.description}</p>
      {entry.diagnosisCodes ? (
        <ul>{entry.diagnosisCodes.map((dc: string) => getDiagnoseRow(dc))}</ul>
      ) : null}
      {entry.discharge ? (
        <p>
          {entry.discharge.date} Discharge: {entry.discharge.criteria}
        </p>
      ) : null}
      <Divider />
    </Container>
  );
};

export default HospitalE;
