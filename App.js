import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/home";
import S_L from "./components/signup&login.js";

function App() {
  return (<>
    <Routes>
      <Route path='/' element={<S_L />} />
      <Route path='/home.js' element={<Home />} />
    </Routes>
  </>
  );
}

export default App;
