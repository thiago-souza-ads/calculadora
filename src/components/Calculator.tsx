import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { Button } from './Button';
import type { Operator } from '../types';

export function Calculator() {
  const {
    display,
    state,
    addDigit,
    addDecimal,
    chooseOperation,
    calculate,
    clear,
    deleteDigit,
    toggleSign,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore,
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

  const hasMemory = state.memory !== 0;

  return (
    <div
      className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl overflow-hidden bg-gray-800 border border-gray-700"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Display display={display} />

      {/* Indicador de memória */}
      {hasMemory && (
        <div className="text-right text-amber-400 text-[10px] px-6 -mt-1 mb-1 font-mono">
          M
        </div>
      )}

      {/* Botões de memória */}
      <div className="grid grid-cols-5 gap-1 px-3 pb-1">
        <button
          onClick={memoryClear}
          className={`text-xs h-8 rounded-lg transition-all ${hasMemory ? 'text-white hover:bg-gray-600' : 'text-gray-600'} cursor-pointer`}
          disabled={!hasMemory}
        >
          MC
        </button>
        <button
          onClick={memoryRecall}
          className={`text-xs h-8 rounded-lg transition-all ${hasMemory ? 'text-white hover:bg-gray-600' : 'text-gray-600'} cursor-pointer`}
          disabled={!hasMemory}
        >
          MR
        </button>
        <button
          onClick={memoryAdd}
          className="text-xs h-8 rounded-lg text-white hover:bg-gray-600 transition-all cursor-pointer"
        >
          M+
        </button>
        <button
          onClick={memorySubtract}
          className="text-xs h-8 rounded-lg text-white hover:bg-gray-600 transition-all cursor-pointer"
        >
          M−
        </button>
        <button
          onClick={memoryStore}
          className="text-xs h-8 rounded-lg text-white hover:bg-gray-600 transition-all cursor-pointer"
        >
          MS
        </button>
      </div>

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
