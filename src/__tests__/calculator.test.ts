import { describe, it, expect } from 'vitest';
import { evaluate, formatOperand, calculatorReducer, INITIAL_STATE } from '../engine/calculator';

describe('evaluate', () => {
  it('soma dois números', () => {
    expect(evaluate('10', '5', '+')).toBe('15');
  });

  it('subtrai dois números', () => {
    expect(evaluate('10', '3', '-')).toBe('7');
  });

  it('multiplica dois números', () => {
    expect(evaluate('4', '3', '*')).toBe('12');
  });

  it('divide dois números', () => {
    expect(evaluate('10', '2', '/')).toBe('5');
  });

  it('retorna Erro ao dividir por zero', () => {
    expect(evaluate('10', '0', '/')).toBe('Erro');
  });

  it('calcula módulo', () => {
    expect(evaluate('10', '3', '%')).toBe('1');
  });

  it('lida com decimais corretamente', () => {
    expect(evaluate('0.1', '0.2', '+')).toBe('0.3');
  });

  it('retorna string vazia para operandos inválidos', () => {
    expect(evaluate('abc', '5', '+')).toBe('');
  });
});

describe('formatOperand', () => {
  it('formata número inteiro com separador de milhar', () => {
    const result = formatOperand('1000');
    expect(result).toContain('1');
  });

  it('retorna string vazia para input vazio', () => {
    expect(formatOperand('')).toBe('');
  });

  it('retorna Erro para input Erro', () => {
    expect(formatOperand('Erro')).toBe('Erro');
  });

  it('preserva casas decimais', () => {
    const result = formatOperand('3.14');
    expect(result).toContain('14');
  });
});

describe('calculatorReducer', () => {
  it('adiciona dígito', () => {
    const state = calculatorReducer(INITIAL_STATE, { type: 'ADD_DIGIT', digit: '5' });
    expect(state.currentOperand).toBe('5');
  });

  it('não adiciona zero à esquerda', () => {
    const state = calculatorReducer(INITIAL_STATE, { type: 'ADD_DIGIT', digit: '0' });
    expect(state.currentOperand).toBe('0');
  });

  it('limpa o estado', () => {
    const dirtyState = { ...INITIAL_STATE, currentOperand: '42', operation: '+' as const, previousOperand: '10' };
    const state = calculatorReducer(dirtyState, { type: 'CLEAR' });
    expect(state).toEqual(INITIAL_STATE);
  });

  it('deleta último dígito', () => {
    const initial = { ...INITIAL_STATE, currentOperand: '42' };
    const state = calculatorReducer(initial, { type: 'DELETE_DIGIT' });
    expect(state.currentOperand).toBe('4');
  });

  it('retorna zero ao deletar único dígito', () => {
    const initial = { ...INITIAL_STATE, currentOperand: '4' };
    const state = calculatorReducer(initial, { type: 'DELETE_DIGIT' });
    expect(state.currentOperand).toBe('0');
  });

  it('escolhe operação', () => {
    const initial = { ...INITIAL_STATE, currentOperand: '5' };
    const state = calculatorReducer(initial, { type: 'CHOOSE_OPERATION', operation: '+' });
    expect(state.operation).toBe('+');
    expect(state.previousOperand).toBe('5');
    expect(state.currentOperand).toBe('0');
  });

  it('calcula resultado', () => {
    const initial = {
      ...INITIAL_STATE,
      previousOperand: '10',
      currentOperand: '5',
      operation: '+' as const,
    };
    const state = calculatorReducer(initial, { type: 'CALCULATE' });
    expect(state.currentOperand).toBe('15');
    expect(state.operation).toBeNull();
    expect(state.overwrite).toBe(true);
  });

  it('alterna sinal', () => {
    const initial = { ...INITIAL_STATE, currentOperand: '5' };
    const state = calculatorReducer(initial, { type: 'TOGGLE_SIGN' });
    expect(state.currentOperand).toBe('-5');
  });

  it('adiciona decimal', () => {
    const state = calculatorReducer(INITIAL_STATE, { type: 'ADD_DECIMAL' });
    expect(state.currentOperand).toBe('0.');
  });

  it('não adiciona decimal duplicado', () => {
    const initial = { ...INITIAL_STATE, currentOperand: '3.14' };
    const state = calculatorReducer(initial, { type: 'ADD_DECIMAL' });
    expect(state.currentOperand).toBe('3.14');
  });

  it('sobrescreve após cálculo', () => {
    const initial = {
      ...INITIAL_STATE,
      currentOperand: '15',
      overwrite: true,
    };
    const state = calculatorReducer(initial, { type: 'ADD_DIGIT', digit: '3' });
    expect(state.currentOperand).toBe('3');
    expect(state.overwrite).toBe(false);
  });

  it('encadeia operações', () => {
    let state = { ...INITIAL_STATE, currentOperand: '10' };
    state = calculatorReducer(state, { type: 'CHOOSE_OPERATION', operation: '+' });
    state = { ...state, currentOperand: '5' };
    state = calculatorReducer(state, { type: 'CHOOSE_OPERATION', operation: '*' });
    expect(state.previousOperand).toBe('15');
    expect(state.operation).toBe('*');
  });
});
