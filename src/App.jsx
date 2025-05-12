import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Components/Login';
import Home from './Components/page/Home';
import CompleteProfile from './Components/CompleteProfile';

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
  
}
export default App
