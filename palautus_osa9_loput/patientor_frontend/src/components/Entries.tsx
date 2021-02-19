import React from "react";
import { Entry } from "../types";
import HospitalE from "../components/HospitalE";
import HealthCheckE from "../components/HealthCheckE";
import OccupationalHealthcareE from "../components/OccupationalHealthcareE";

const Entries: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  /*** Helper function for exhaustive type checking*/
  // const assertNever = (value: never): never => {
  //   throw new Error(
  //     `Unhandled discriminated union member: ${JSON.stringify(value)}`
  //   );
  // };

  return (
    <div>
      {entries.length > 0 ? (
        <div>
          <h3>Entries</h3>
          {entries.map((e) => {
            switch (e.type) {
              case "Hospital":
                return <HospitalE entry={e} key={e.id} />;
              case "HealthCheck":
                return <HealthCheckE entry={e} key={e.id} />;
              case "OccupationalHealthcare":
                return <OccupationalHealthcareE entry={e} key={e.id} />;
              default:
                return; //assertNever(e);
            }
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Entries;
