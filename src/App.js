import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'; 
import Auth from './Pages/Auth'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
