import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { Button } from './Button';
import type { Operator } from '../types';

export function Calculator() {
  const {
    display,
    addDigit,
    addDecimal,
    chooseOperation,
    calculate,
    clear,
    deleteDigit,
    toggleSign,
  } = useCalculator();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') addDigit(e.key);
    else if (e.key === '.') addDecimal();
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      chooseOperation(e.key as Operator);
    }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Escape') clear();
    else if (e.key === 'Backspace') deleteDigit();
  };

  return (
    <div
      className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl overflow-hidden bg-gray-800 border border-gray-700"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Display display={display} />

      <div className="grid grid-cols-4 gap-1 p-3 bg-gray-800">
        {/* Linha 1 - Funções */}
        <Button onClick={clear} variant="function">AC</Button>
        <Button onClick={toggleSign} variant="function">±</Button>
        <Button onClick={() => chooseOperation('%')} variant="function">%</Button>
        <Button onClick={() => chooseOperation('/')} variant="operator">÷</Button>

        {/* Linha 2 */}
        <Button onClick={() => addDigit('7')}>7</Button>
        <Button onClick={() => addDigit('8')}>8</Button>
        <Button onClick={() => addDigit('9')}>9</Button>
        <Button onClick={() => chooseOperation('*')} variant="operator">×</Button>

        {/* Linha 3 */}
        <Button onClick={() => addDigit('4')}>4</Button>
        <Button onClick={() => addDigit('5')}>5</Button>
        <Button onClick={() => addDigit('6')}>6</Button>
        <Button onClick={() => chooseOperation('-')} variant="operator">−</Button>

        {/* Linha 4 */}
        <Button onClick={() => addDigit('1')}>1</Button>
        <Button onClick={() => addDigit('2')}>2</Button>
        <Button onClick={() => addDigit('3')}>3</Button>
        <Button onClick={() => chooseOperation('+')} variant="operator">+</Button>

        {/* Linha 5 */}
        <Button onClick={() => addDigit('0')} span={2}>0</Button>
        <Button onClick={addDecimal}>,</Button>
        <Button onClick={calculate} variant="equals">=</Button>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-600 text-xs pb-2">
        Pressione as teclas do teclado para operar
      </div>
      <div className="text-center text-gray-500 text-[10px] pb-3">
        Direitos reservados NextAge
      </div>
    </div>
  );
}
