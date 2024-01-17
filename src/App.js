import './App.css';
import Weather from './Components/Weather';
import NavComp from './Components/NavComp';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <NavComp/>
      <Weather />
      <Footer />
    </div>
  );
}

export default App;
