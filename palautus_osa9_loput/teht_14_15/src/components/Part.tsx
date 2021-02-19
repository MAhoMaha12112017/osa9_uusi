import React from 'react';
import { CoursePart } from '../index';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ coursePart: CoursePart} > = ({ coursePart }) => {
  switch (coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          <p>Name: <b>{coursePart.name}</b></p>
          <p>Description: {coursePart.description}</p>
        </div>);
      break;
    case "Using props to pass data":
      return (
        <div>
          <p>Name: <b>{coursePart.name}</b></p>
          <p>GroupProjectCount: {coursePart.groupProjectCount}</p>
        </div>
      );
      break;
    case "Deeper type usage":
      return (
        <div>
          <p>Name: <b>{coursePart.name}</b></p>
          <p>Description: {coursePart.description} </p>
          <p>ExerciseSubmissionLink: {coursePart.exerciseSubmissionLink} </p>
        </div>
         );
      break;
    case "Matin kurssi":
      return (
        <div>
        <p>Name: <b>{coursePart.name}</b></p>
        <p>Description: {coursePart.description} </p>
        <p>ExerciseSubmissionLink: {coursePart.exerciseCount} </p>
        <p>Extra: {coursePart.extra} </p>
      </div>
      )
      default:
        return assertNever(coursePart); 
  }
}

export default Part;