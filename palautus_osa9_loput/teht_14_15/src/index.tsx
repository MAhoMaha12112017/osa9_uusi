import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseWDescription {
  name: "Fundamentals";
  // description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWDescription {
  name: "Deeper type usage";
  // description: string;
  exerciseSubmissionLink: string;
}

interface CoursePartMatti extends CoursePartBaseWDescription {
  name: "Matin kurssi";
  extra: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartMatti;

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Matin kurssi",
      description: "No Matin kurssi tämä on",
      exerciseCount: 666,
      extra: "Free coffee"
    }
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));