// Tipos da Calculadora

export type Operator = '+' | '-' | '*' | '/' | '%';

export type CalculatorAction =
  | { type: 'ADD_DIGIT'; digit: string }
  | { type: 'CHOOSE_OPERATION'; operation: Operator }
  | { type: 'CALCULATE' }
  | { type: 'CLEAR' }
  | { type: 'DELETE_DIGIT' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'ADD_DECIMAL' }
  | { type: 'MEMORY_CLEAR' }
  | { type: 'MEMORY_RECALL' }
  | { type: 'MEMORY_ADD' }
  | { type: 'MEMORY_SUBTRACT' }
  | { type: 'MEMORY_STORE' };

export interface CalculatorState {
  currentOperand: string;
  previousOperand: string;
  operation: Operator | null;
  overwrite: boolean;
  memory: number;
}

export interface CalculatorDisplay {
  current: string;
  previous: string;
  operation: string;
}
