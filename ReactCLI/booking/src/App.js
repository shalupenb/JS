import Category from './Category';
import Admin from './Admin';
import Home from './Home';
import Layout from './Layout';
import Location from './Location';
import Room from './Room';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="category/:slug" element={<Category />} />
          <Route path="location/:slug" element={<Location />} />
          <Route path="room/:slug" element={<Room />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
