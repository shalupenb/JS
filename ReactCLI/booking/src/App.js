import Category from './Category';
import Admin from './Admin';
import Home from './Home';
import Layout from './Layout';
import Location from './Location';
import Room from './Room';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import './App.css';

/* Контекст - це певний аналог глобальних змінних, доступних у різних частинах проєекту, який також містить механізми спостереження за змінами контексту та повідомлення про них своїх підписників */
export const UserContext = createContext(null);

function App() {
  /*Значення, що їх буде моніторити контекст - знаходяться максимально "високо" за ієрархією елементів - у найпершому елементі App*/
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  /*Те, що знаходиться у провайдері контексту (<UserContext.Provider...) є підписниками на його зміни. Відповідно, будь-який елемент в середині иіла контексту може викликати set-тер і всі інші елементи одержать це повідомлення.*/
  useEffect(() => {
    //console.log('App Effect');
    const tokenKey = 'token';
    const t = window.localStorage.getItem(tokenKey);
    if (t) {
      const token = JSON.parse(t);
      const currentTime = new Date().getTime();
      const expireTime = new Date(token.expiresDt).getTime();
      if (currentTime > expireTime) {
          alert('Сесія завершена, необхідно оновлення');
          window.localStorage.removeItem(tokenKey);
      } else {
          setToken(token);
      }
  }
    const u = window.localStorage.getItem('user');
    if(u) {
      setUser(JSON.parse(u));
    }
  }, []);
  return (
    <UserContext.Provider value={{ user: user, setUser: setUser, token: token, setToken: setToken }}>
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
    </UserContext.Provider>
  );
}

export default App;
