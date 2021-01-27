// counts BMI based on given height (in centimeters) and weight (in kilograms) 
// and then returns a message that suits the results.

interface BmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (height: number, weight: number): string => {
  // the body mass divided by the square of the body height
  // mass in kilograms and height in metres
  const Bmi = weight / Math.pow(height / 100, 2);
  if (Bmi < 15) {
    return 'Very severely underweight';
  } else if (Bmi < 16) {
    return 'Severely underweight';
  } else if (Bmi < 18.5) {
    return 'Underweight';
  } else if (Bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (Bmi < 30) {
    return 'Obese Class I (Moderately obese)';
  } else if (Bmi < 40) {
    return 'Obese Class II (Severely obese)';
  } else if (Bmi >= 40) {
    return 'Obese Class III (Very severely obese)';
  }
  return 'Bmi value could not be counted..';
};

/* tehtävä 1
console.log(calculateBmi(180, 74))
*/

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch(e) {
  console.log(e.message)
}