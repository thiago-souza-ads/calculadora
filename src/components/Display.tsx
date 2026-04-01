import type { CalculatorDisplay } from '../types';

interface DisplayProps {
  display: CalculatorDisplay;
}

export function Display({ display }: DisplayProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-t-2xl">
      <div className="text-right min-h-[2rem] text-gray-400 text-sm font-mono tracking-wider">
        {display.previous} {display.operation}
      </div>
      <div className="text-right text-white text-5xl font-light font-mono tracking-wider overflow-hidden">
        {display.current || '0'}
      </div>
    </div>
  );
}
