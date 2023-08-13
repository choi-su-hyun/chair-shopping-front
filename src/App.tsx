import React, { useContext, useState, useEffect } from 'react';
import './css/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from './context/context';
import { Provider } from 'react-redux';
import store from './redux/store';
import { connect } from 'react-redux';
import { recieveCookieUserData } from './redux/userAuth/action';
import { recieveCookieAdminData } from './redux/adminAuth/action';

// Component
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import Subscribers from './components/exercise/Subscribers';
import Display from './components/exercise/Display';
import Views from './components/exercise/Views';
import Admin from './pages/AdminMain';
import HeaderAdmin from './components/HeaderAdmin';
import AdminLogin from './pages/AdminLogin';
import AdminMain from './pages/AdminMain';
import AdminCreate from './pages/AdminCreate';
import NotFound from './pages/NotFound';
import ProductPage from './pages/ProductPage';
import DetailPage from './pages/DetailPage';

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
    props.recieveCookieUserData();
    props.recieveCookieAdminData();
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Main increase={increaseHandler} />}
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/product" element={<ProductPage />}></Route>
            <Route path="/product/:id" element={<DetailPage />}></Route>
            <Route path="/*" element={<NotFound />}></Route>

            {/* 관리자 페이지 */}
            <Route path="/admin" element={<AdminLogin />}></Route>
            <Route path="/admin-dashboard" element={<AdminMain />}></Route>
            <Route path="/admin-create" element={<AdminCreate />}></Route>
          </Routes>
        </Provider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    recieveCookieUserData: () => dispatch(recieveCookieUserData()),
    recieveCookieAdminData: () => dispatch(recieveCookieAdminData()),
  };
};

export default connect(null, mapDispatchToProps)(App);
