interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArgumentsBMI = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height/100)^2);
  if (bmi < 18.4) {
    console.log("Underweight");
    return "Underweight";
  } else if ( 18.5 <= bmi && bmi <= 24.9) {
    console.log("Normal (healthy weight)");
    return "Normal (healthy weight)";
  } else {
    console.log("Overweight");
    return "Overweight";
  }
};

try {
  const { value1, value2 } = parseArgumentsBMI(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
