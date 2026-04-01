interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'equals' | 'function';
  span?: 1 | 2;
}

const variantStyles: Record<string, string> = {
  default:
    'bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white',
  operator:
    'bg-amber-500 hover:bg-amber-400 active:bg-amber-300 text-white',
  equals:
    'bg-green-500 hover:bg-green-400 active:bg-green-300 text-white',
  function:
    'bg-gray-500 hover:bg-gray-400 active:bg-gray-300 text-gray-900',
};

export function Button({ children, onClick, variant = 'default', span = 1 }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${variantStyles[variant]}
        ${span === 2 ? 'col-span-2' : ''}
        rounded-xl text-2xl font-medium
        h-16 transition-all duration-150
        active:scale-95 select-none
        cursor-pointer
      `}
    >
      {children}
    </button>
  );
}
