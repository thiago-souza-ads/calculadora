import type { CalculatorState, CalculatorAction, Operator } from '../types';

export const INITIAL_STATE: CalculatorState = {
  currentOperand: '0',
  previousOperand: '',
  operation: null,
  overwrite: false,
  memory: 0,
};

export function evaluate(previousOperand: string, currentOperand: string, operation: Operator): string {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return '';

  let result: number;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) return 'Erro';
      result = prev / current;
      break;
    case '%':
      result = prev % current;
      break;
    default:
      return '';
  }

  // Evitar problemas de ponto flutuante
  return parseFloat(result.toPrecision(12)).toString();
}

export function formatOperand(operand: string): string {
  if (!operand || operand === '') return '';
  if (operand === 'Erro') return 'Erro';

  const [integer, decimal] = operand.split('.');
  const formattedInteger = parseInt(integer).toLocaleString('pt-BR');

  if (decimal != null) {
    return `${formattedInteger},${decimal}`;
  }

  return formattedInteger;
}

export function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'ADD_DIGIT': {
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.digit,
          overwrite: false,
        };
      }
      if (action.digit === '0' && state.currentOperand === '0') return state;
      if (state.currentOperand === '0' && action.digit !== '.') {
        return { ...state, currentOperand: action.digit };
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand}${action.digit}`,
      };
    }

    case 'ADD_DECIMAL': {
      if (state.overwrite) {
        return { ...state, currentOperand: '0.', overwrite: false };
      }
      if (state.currentOperand.includes('.')) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand}.`,
      };
    }

    case 'CHOOSE_OPERATION': {
      if (state.currentOperand === '0' && state.previousOperand === '') return state;

      if (state.previousOperand === '') {
        return {
          ...state,
          operation: action.operation,
          previousOperand: state.currentOperand,
          currentOperand: '0',
        };
      }

      if (state.currentOperand === '0') {
        return { ...state, operation: action.operation };
      }

      return {
        ...state,
        previousOperand: evaluate(state.previousOperand, state.currentOperand, state.operation!),
        operation: action.operation,
        currentOperand: '0',
      };
    }

    case 'CALCULATE': {
      if (!state.operation || state.previousOperand === '') return state;

      const result = evaluate(state.previousOperand, state.currentOperand, state.operation);
      return {
        currentOperand: result,
        previousOperand: '',
        operation: null,
        overwrite: true,
      };
    }

    case 'CLEAR':
      return INITIAL_STATE;

    case 'DELETE_DIGIT': {
      if (state.overwrite) return INITIAL_STATE;
      if (state.currentOperand === '0') return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: '0' };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    }

    case 'TOGGLE_SIGN': {
      if (state.currentOperand === '0') return state;
      if (state.currentOperand.startsWith('-')) {
        return { ...state, currentOperand: state.currentOperand.slice(1) };
      }
      return { ...state, currentOperand: `-${state.currentOperand}` };
    }

    case 'MEMORY_CLEAR':
      return { ...state, memory: 0 };

    case 'MEMORY_RECALL':
      return {
        ...state,
        currentOperand: state.memory === 0 ? '0' : parseFloat(state.memory.toPrecision(12)).toString(),
        overwrite: true,
      };

    case 'MEMORY_ADD': {
      const valAdd = parseFloat(state.currentOperand);
      if (isNaN(valAdd)) return state;
      return { ...state, memory: state.memory + valAdd, overwrite: true };
    }

    case 'MEMORY_SUBTRACT': {
      const valSub = parseFloat(state.currentOperand);
      if (isNaN(valSub)) return state;
      return { ...state, memory: state.memory - valSub, overwrite: true };
    }

    case 'MEMORY_STORE': {
      const valStore = parseFloat(state.currentOperand);
      if (isNaN(valStore)) return state;
      return { ...state, memory: valStore, overwrite: true };
    }

    default:
      return state;
  }
}
