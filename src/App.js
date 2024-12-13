import './App.css';
import { Auth } from './components/auth/Auth';
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={"Hello"} />
        <Route path="/account" element={ <Auth/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
