import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state/state";
import { HealthCheckEntry } from "../types";

import {
  TextField,
  NumberField,
  DiagnosisSelection,
} from "../AddPatientModal/FormField"; // , GenderOption , SelectField
// import { Gender, Patient } from "../types";

export type PatientEntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: PatientEntryFormValues) => void;
  onCancel: () => void;
}

export const AddPatientEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: 0, // undefined or...
        // PatientID:
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!Date.parse(values.date)) {
          errors.date = "Give date in date format";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({
        // isValid,
        // dirty,
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
      }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            {errors.description && touched.description ? (
              <div>{errors.description}</div>
            ) : null}
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            {errors.date}
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {errors.specialist}
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            {errors.healthCheckRating}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  // disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientEntryForm;
