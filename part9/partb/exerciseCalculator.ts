const parseArguments = (args: Array<string>) => {
    let _value1: string, _value2: string, value3: string, arr: Array<string>, target: number;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
    [ _value1, _value2, value3, ...arr] = args;

    console.log(_value1, _value2);
    
    const newArr = [];
    // eslint-disable-next-line prefer-const
    target = Number(value3);

    for (let i = 0; i < arr.length; i ++) {
        newArr[i] = Number(arr[i]);
    }

    return { target, newArr };
};

export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = ( target: number , arr: Array<number>): Result => {
    let sum = 0;
    const periodLength = arr.length;
    let trainingDays = 0;
    let success = true;
    let rating = 0;
    let ratingDescription = '';
    let average = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            trainingDays += 1;
            sum = sum + arr[i];
        }
    }

    rating = Math.round(sum / periodLength);
    average = sum / periodLength;

    if (average < target) {
        ratingDescription = 'not too bad but could be better';
        success = false;
    } else if (average === target) {
        ratingDescription = 'good';
        success = true;
    } else {
        ratingDescription = 'great';
        success = true;
    }

    console.log({ periodLength, trainingDays, success, rating, ratingDescription, target, average });
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

try {
    const { target, newArr } = parseArguments(process.argv);
    calculateExercises(target, newArr);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}