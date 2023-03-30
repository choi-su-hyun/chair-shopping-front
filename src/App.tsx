import React, { useContext, useState, useEffect } from 'react';
import './css/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from './context/context';
import { Provider } from 'react-redux';
import store from './redux/store';
import { connect } from 'react-redux';
import { saveCookieData } from './redux/userAuth/action';

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

function App(props: any) {
  const user: { name: string } = useContext(Context);
  const user2: { name: string } = {
    name: 'provider로 받아보자',
  };
  const [isCounter, setIsCounter] = useState(0);
  const increaseHandler = (num: number) => {
    setIsCounter((current: number) => current + num);
  };
  useEffect(() => {
    props.saveCookieData();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Header />
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    saveCookieData: () => dispatch(saveCookieData()),
  };
};

export default connect(null, mapDispatchToProps)(App);
