import express from 'express';
import { calculateBmi } from  './bmiCalculator';
import { calculateExercises, ExerciseValues } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  
  if (!(height) || !(weight) || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
      weight,
      height,
      bmi
    });
  }
});

app.post('/exercises', (req, res) => {
  if (!req.body) {
    res.status(400).send({
      error: "parameters missing"
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target)  {
    res.status(400).send({
      error: "parameters missing"
    });
  }
  if (!Array.isArray(daily_exercises)) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  } else {
    daily_exercises.forEach(e => {
      if (isNaN(Number(e))) { 
        res.status(400).send({
          error: "malformatted parameters"
        });
      }
    });
    if (isNaN(Number(target))){
      res.status(400).send({
        error: "malformatted parameters"
      });
    }
    const checkedValues: ExerciseValues = {
      targetValue: Number(target),
      exValues: daily_exercises.map(e => Number(e))
    }; 
    res.send(calculateExercises(checkedValues.exValues, checkedValues.targetValue));
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});