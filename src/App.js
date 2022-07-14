import logo from './logo.svg';
import './App.css';
import Temperature from './components/Temperature/Temperature';
import TemperatureContainer from './components/TemperatureContainer';
import Graph from './components/Graph';

function App() {
  return (
    <div className="App container">
      <h3 className='text-center mb-5'>Temperatures des cours d'eau du département de la Gironde</h3>
      <TemperatureContainer></TemperatureContainer>
      <Graph></Graph>
    </div>
  );
}

export default App;
