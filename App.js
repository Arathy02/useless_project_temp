import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from './Components/Home';
import LifestyleSurvey from './Components/LifestyleSurvey';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qs" element={<LifestyleSurvey/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
