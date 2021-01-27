export interface ResultObject {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
}

interface Ratings {
  ratingValue: number,
  description: string
}

export interface ExerciseValues {
  targetValue: number;
  exValues: number[];
}

const parseArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  args.slice(2).forEach(a => {
    if (isNaN(Number(a))) { 
      throw new Error('Provided values were not numbers!');
    }
  });
  return {
    targetValue: Number(args[2]),
    exValues: args.slice(3).map(a => Number(a))
  };
};

const giveRatings = (averageHours: number): Ratings => {
  if (averageHours < 0.3) { return {description: 'too bad', ratingValue: 1 }; }
  if (averageHours < 2) { return {description: 'ok', ratingValue: 2 }; }
  if (averageHours >= 2) { return {description: 'very good', ratingValue: 3 }; }
  return {description: 'unknown', ratingValue: 0};
};

export const calculateExercises  = (list: number[], targetValue: number): ResultObject => {

  const totalHours = list.reduce((acc, curr) => acc + curr, 0);
  const periodLength = list.length;
  const trainingDays = list.filter(d => d > 0).length;
  const target = targetValue; 
  const average = totalHours / periodLength;
  const success = average >= target;
  const ratings = giveRatings(average);
  const rating = ratings.ratingValue;
  const ratingDescription = ratings.description;
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { targetValue, exValues } = parseArgs(process.argv);
  console.log(calculateExercises(exValues, targetValue));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message); // It's an Error instance.
  } else {
    console.error("Error. With no messagee"); // Who knows?
  }
}

/* tehtävä 2
const data: number[] = [3, 0, 2, 4.5, 0, 3, 1];
const target: number = 2;
console.log(calculateExercises(data, target));
*/



// export const parseExValues = (args: Array<unknown>): Array<number> | undefined => {
//   if (args.length < 1) {return undefined;}

//   args.forEach(a => {
//     if (isNaN(Number(a))) { 
//       return undefined;
//     } 
//   });
//   return args.map(a => Number(a));
// };