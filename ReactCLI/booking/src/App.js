import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from './Category';
import Admin from './Admin';
import Home from './Home';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="category" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
