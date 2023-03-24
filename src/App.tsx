import React, { useContext, useState } from 'react';
import './css/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from './context/context';
import { Provider } from 'react-redux';
import store from './redux/store';

// Component
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import Subscribers from './components/exercise/Subscribers';
import Display from './components/exercise/Display';
import Views from './components/exercise/Views';

export interface counterProps {
  increase: (num: number) => void;
}

function App() {
  const user: { name: string } = useContext(Context);
  const user2: { name: string } = {
    name: 'provider로 받아보자',
  };
  const [isCounter, setIsCounter] = useState(0);
  const increaseHandler = (num: number) => {
    setIsCounter((current: number) => current + num);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Provider store={store}>
          <Routes>
            <Route
              path="/main"
              element={<Main increase={increaseHandler} />}
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/exercise" element={<Subscribers />}></Route>
          </Routes>
        </Provider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
