// Tipos da Calculadora

export type Operator = '+' | '-' | '*' | '/' | '%';

export type CalculatorAction =
  | { type: 'ADD_DIGIT'; digit: string }
  | { type: 'CHOOSE_OPERATION'; operation: Operator }
  | { type: 'CALCULATE' }
  | { type: 'CLEAR' }
  | { type: 'DELETE_DIGIT' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'ADD_DECIMAL' };

export interface CalculatorState {
  currentOperand: string;
  previousOperand: string;
  operation: Operator | null;
  overwrite: boolean;
}

export interface CalculatorDisplay {
  current: string;
  previous: string;
  operation: string;
}
