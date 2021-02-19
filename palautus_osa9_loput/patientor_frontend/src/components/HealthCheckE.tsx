import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
// import { Container, Header } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";
import { Icon, Container, Divider } from "semantic-ui-react";

const HealthCheckE: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
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
        {entry.date} <Icon name="heart" size="large" />{" "}
      </p>
      <p>{entry.description}</p>
      {entry.diagnosisCodes ? (
        <ul>{entry.diagnosisCodes.map((dc: string) => getDiagnoseRow(dc))}</ul>
      ) : null}
      <p>Healt Risk Level: {HealthCheckRating[entry.healthCheckRating]}</p>
      <Divider />
    </Container>
  );
};

export default HealthCheckE;
