type Operation = 'multiply' | 'add' | 'divide';

type Result = number;

const calculator = (a: number, b: number, op : Operation) : Result => {
  try {
    switch(op) {
      case 'multiply':
        return a * b;
      case 'divide':
        if( b === 0) throw new Error('Can\'t divide by 0!');
        return a / b;
      case 'add':
        return a + b;
      default:
        throw new Error('Operation is not multiply, add or divide!');
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Something went wrong, error message: ', e.message);
  }
  
};

console.log(calculator(1, 5 , 'divide'));
