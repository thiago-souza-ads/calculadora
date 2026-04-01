import { useReducer, useCallback } from 'react';
import { calculatorReducer, INITIAL_STATE, formatOperand } from '../engine/calculator';
import type { Operator, CalculatorDisplay } from '../types';

export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);

  const addDigit = useCallback((digit: string) => {
    dispatch({ type: 'ADD_DIGIT', digit });
  }, []);

  const addDecimal = useCallback(() => {
    dispatch({ type: 'ADD_DECIMAL' });
  }, []);

  const chooseOperation = useCallback((operation: Operator) => {
    dispatch({ type: 'CHOOSE_OPERATION', operation });
  }, []);

  const calculate = useCallback(() => {
    dispatch({ type: 'CALCULATE' });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const deleteDigit = useCallback(() => {
    dispatch({ type: 'DELETE_DIGIT' });
  }, []);

  const toggleSign = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIGN' });
  }, []);

  const display: CalculatorDisplay = {
    current: formatOperand(state.currentOperand),
    previous: formatOperand(state.previousOperand),
    operation: state.operation || '',
  };

  return {
    display,
    state,
    addDigit,
    addDecimal,
    chooseOperation,
    calculate,
    clear,
    deleteDigit,
    toggleSign,
  };
}
