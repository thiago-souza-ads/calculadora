import { Calculator } from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-gray-400 text-sm font-light mb-6 tracking-widest uppercase">
          Calculadora
        </h1>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
