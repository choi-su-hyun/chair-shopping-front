import React, { useContext, useState, useEffect } from 'react';
import './css/App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from './context/context';
import { Provider } from 'react-redux';
import store from './redux/store';
import { connect } from 'react-redux';
import { recieveCookieUserData } from './redux/userAuth/action';
import { recieveCookieAdminData } from './redux/adminAuth/action';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';

// Component
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './components/Footer/Footer';
import Subscribers from './components/exercise/Subscribers';
import Display from './components/exercise/Display';
import Views from './components/exercise/Views';
import Admin from './pages/AdminMain';
import HeaderAdmin from './components/Header/HeaderAdmin';
import AdminLogin from './pages/AdminLogin';
import AdminMain from './pages/AdminMain';
import AdminCreate from './pages/AdminCreate';
import AdminProductDetail from './components/posts/AdminProductDetail/AdminProductDetail';
import NotFound from './pages/NotFound';
import ProductPage from './pages/ProductPage/ProductPage';
import DetailPage from './pages/DetailPage/DetailPage';
import CartPage from './pages/CartPage/CartPage';
import AlertPopup from './components/AlertPopup/AlertPopup';
import AdminEditPage from './pages/AdminEditPage/AdminEditPage';
import OrderPage from './pages/OrderPage/OrderPage';

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
  const popupController = useSelector(
    (state: RootState) => state.popup.popupController,
  );
  useEffect(() => {
    props.recieveCookieUserData();
    props.recieveCookieAdminData();
    // const testData2 = testGetCookie('user_name');
    // console.log('testData2', testData2);
    // const testData = getCookie('test_name');
    // console.log('testData', testData);
    // const testData3 = getCookie('user_name');
    // console.log('testData3', testData3);
  }, []);
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
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/order" element={<OrderPage />}></Route>
            <Route path="/*" element={<NotFound />}></Route>

            {/* 관리자 페이지 */}
            <Route path="/admin" element={<AdminLogin />}></Route>
            <Route path="/admin-dashboard" element={<AdminMain />}></Route>
            <Route path="/admin-create" element={<AdminCreate />}></Route>
            <Route
              path="/admin-product/:id"
              element={<AdminProductDetail />}
            ></Route>
            <Route
              path="/admin-edit-product/:id"
              element={<AdminEditPage />}
            ></Route>
          </Routes>
        </Provider>
        <Footer />
        {popupController && <AlertPopup />}
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
