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
import Main from './pages/Main/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Subscribers from './components/exercise/Subscribers';
import Display from './components/exercise/Display';
import Views from './components/exercise/Views';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminMain/AdminDashboard';
import AdminCreate from './pages/AdminCreate/AdminCreate';
import AdminProductDetail from './components/posts/AdminProductDetail/AdminProductDetail';
import NotFound from './pages/NotFound';
import ProductPage from './pages/ProductPage/ProductPage';
import DetailPage from './pages/DetailPage/DetailPage';
import CartPage from './pages/CartPage/CartPage';
import AlertPopup from './components/AlertPopup/AlertPopup';
import AdminEditPage from './pages/AdminEditPage/AdminEditPage';
import OrderPage from './pages/OrderPage/OrderPage';
import AdminCategoryCreatePage from './pages/AdminCategoryCreatePage/AdminCategoryCreatePage';
import AdminCategoryEditPage from './pages/AdminCategoryEditPage/AdminCategoryEditPage';

import MainLayout from './pages/MainLayout';
import AdminLoginLayout from './pages/AdminLoginLayout';
import AdminContentLayout from './pages/AdminContentLayout/AdminContentLayout';

import PrivateRouter from './router/PrivateRouter';
import PublicRouter from './router/PublicRouter';
import AdminPrivateRouter from './router/AdminPrivateRouter';
import AdminPublicRouter from './router/AdminPublicRouter';

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
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route
                path="/"
                element={<Main increase={increaseHandler} />}
              ></Route>
              <Route element={<PrivateRouter />}>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="/order" element={<OrderPage />}></Route>
              </Route>
              <Route element={<PublicRouter />}>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
              </Route>
              <Route path="/product" element={<ProductPage />}></Route>
              <Route path="/product/:id" element={<DetailPage />}></Route>
              <Route path="/*" element={<NotFound />}></Route>
            </Route>

            {/* 관리자 페이지 */}
            <Route element={<AdminLoginLayout />}>
              <Route element={<AdminPublicRouter />}>
                <Route path="/admin" element={<AdminLogin />}></Route>
              </Route>
            </Route>
            <Route element={<AdminContentLayout />}>
              <Route element={<AdminPrivateRouter />}>
                <Route
                  path="/admin-dashboard"
                  element={<AdminDashboard />}
                ></Route>
                <Route path="/admin-create" element={<AdminCreate />}></Route>
                <Route
                  path="/admin-product/:id"
                  element={<AdminProductDetail />}
                ></Route>
                <Route
                  path="/admin-edit-product/:id"
                  element={<AdminEditPage />}
                ></Route>
                <Route
                  path="/admin-category-create"
                  element={<AdminCategoryCreatePage />}
                ></Route>
                <Route
                  path="/admin-edit-category/:id"
                  element={<AdminCategoryEditPage />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </Provider>
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
