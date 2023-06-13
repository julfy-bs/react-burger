import styles from './app.module.css';
import Header from '../header/header.jsx';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  ProfileLayout,
  ProfileFormPage,
  ProfileOrdersPage,
  IngredientPage, OrderPage
} from '../../pages/index.js';
import clsx from 'clsx';
import Modal from '../modal/modal.jsx';
import Notification from '../notification/notification.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderModal from '../order-modal/order-modal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/loader.jsx';
import ProtectedRoute from '../protected-route/protected-route.jsx';
import { useCallback, useEffect } from 'react';
import { setLoading } from '../../services/slices/loadingSlice.js';
import { useModal } from '../../hooks/useModal.js';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk.js';
import { PATH } from '../../utils/config.js';
import { useAuthorization } from '../../hooks/useAuthorization.js';
import { closeAllModal } from '../../services/slices/modalSlice.js';
import { fetchGetUser } from '../../services/asyncThunk/getUserThunk.js';
import OrderDetails from '../order-details/order-details.jsx';
import FeedPage from '../../pages/feed/feed.jsx';

const App = () => {
  const {
    ingredientsFetchRequest,
    ingredients
  } = useSelector(store => store.ingredients);
  const { orderNumber } = useSelector(store => store.order);
  const { isLogin, isLogout } = useSelector(store => store.user.user);
  const { isTokenExpired } = useAuthorization();
  const { isModalOpen } = useModal();
  const { modalIngredient, modalOrder, modalOrderSuccess, modalNotification } = useSelector(store => store.modal);
  const { loading } = useSelector(store => store.loading);
  const dispatch = useDispatch();
  const location = useLocation();
  const background = modalIngredient || modalOrder ? location.state.background : null;
  const { previousUrl, tokenData } = useAuthorization();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user);


  useEffect(() => {
    dispatch(setLoading({ loading: ingredientsFetchRequest }));
  }, [dispatch, ingredientsFetchRequest]);

  useEffect(() => {
    if (ingredients && ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
    if ((!isLogout && !isLogin && isTokenExpired && tokenData?.refreshToken)
      || (isLogin && (!user.name || !user.email))) {
      dispatch(fetchGetUser());
    }
  }, [dispatch, isLogin, isTokenExpired, user, ingredients, isLogout, tokenData?.refreshToken]);

  const handleModalClose = useCallback(() => {
    dispatch(closeAllModal());
    (modalIngredient || modalOrder) &&
    navigate(previousUrl, {
      replace: true,
      state: { background: null }
    });
  }, [dispatch, modalIngredient, modalOrder, navigate, previousUrl]);


  return (
    <>
      <Header/>
      <main className={clsx(styles.main)}>
        {
          loading
            ? (<Loader/>)
            : (
              <Routes location={background || location}>
                <Route
                  exact
                  path={PATH.HOME}
                  element={
                    ingredients.length > 0
                    && !ingredientsFetchRequest
                    && <ConstructorPage/>
                  }
                />
                <Route
                  path={PATH.LOGIN}
                  element={
                    <ProtectedRoute
                      anonymous={true}
                      redirectTo={PATH.HOME}
                    >
                      <LoginPage/>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={PATH.REGISTER}
                  element={
                    <ProtectedRoute
                      anonymous={true}
                      redirectTo={PATH.HOME}
                    >
                      <RegisterPage/>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={PATH.FORGOT_PASSWORD}
                  element={
                    <ProtectedRoute
                      anonymous={true}
                      redirectTo={PATH.HOME}
                    >
                      <ForgotPasswordPage/>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={PATH.RESET_PASSWORD}
                  element={
                    <ProtectedRoute
                      anonymous={true}
                      redirectTo={PATH.HOME}
                    >
                      <ResetPasswordPage/>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={PATH.PROFILE}
                  element={
                    <ProtectedRoute
                      anonymous={false}
                      redirectTo={PATH.LOGIN}
                    >
                      <ProfileLayout/>
                    </ProtectedRoute>
                  }>
                  <Route
                    index
                    element={<ProfileFormPage/>}
                  />
                  <Route
                    path={PATH.ORDERS}
                    element={<ProfileOrdersPage/>}
                  />
                </Route>
                <Route
                  path={PATH.FEED}
                  element={<FeedPage/>}
                />
                <Route
                  path={PATH.FEED_ORDER}
                  element={<OrderPage/>}
                />
                <Route
                  path={PATH.ORDER}
                  element={
                    <ProtectedRoute
                      redirectTo={PATH.LOGIN}
                    >
                      <OrderPage/>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={PATH.INGREDIENT}
                  element={<IngredientPage/>}
                />
                <Route
                  path="*"
                  element={<NotFoundPage/>}
                />
              </Routes>)
        }
      </main>


      {
        modalNotification && (
          <Notification title={modalNotification}/>
        )
      }

      <Modal
        handleModalClose={handleModalClose}
        isModalOpen={isModalOpen}
        title={
          modalIngredient
            ? 'Детали ингредиента'
            : ''
        }

        ariaTitle={
          modalOrder
            ? 'Идентификатор заказа'
            : ''
        }
      >
        {modalIngredient && (
          <IngredientDetails ingredient={modalIngredient}/>
        )}

        {modalOrder && (
          <OrderDetails order={modalOrder}/>
        )}

        {orderNumber && modalOrderSuccess && (
          <OrderModal/>
        )}
      </Modal>
    </>
  );
};

export default App;