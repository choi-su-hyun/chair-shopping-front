import React, { useContext, useState } from 'react';
import './css/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from './context/context';

// Component
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';

function App() {
  const user: { name: string } = useContext(Context);
  const user2: { name: string } = {
    name: 'provider로 받아보자',
  };
  const [emit, setEmit] = useState('이전 값');
  const emitHandler = () => {
    setEmit('달라진 값');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div>{user.name}</div>
        <Context.Provider value={user2}>
          <Routes>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
        </Context.Provider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
