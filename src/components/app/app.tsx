import styles from './app.module.css';
import Header from '../header/header';
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
} from '../../pages';
import clsx from 'clsx';
import Modal from '../modal/modal';
import Notification from '../notification/notification';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderModal from '../order-modal/order-modal';
import Loader from '../loader/loader';
import ProtectedRoute from '../protected-route/protected-route';
import { useCallback, useEffect } from 'react';
import { setLoading } from '../../services/slices/loadingSlice';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk';
import { PATH } from '../../utils/config';
import { useAuthorization } from '../../hooks/useAuthorization';
import { closeAllModal } from '../../services/slices/modalSlice';
import { fetchGetUser } from '../../services/asyncThunk/getUserThunk';
import OrderDetails from '../order-details/order-details';
import FeedPage from '../../pages/feed/feed';
import { getIngredients, getLoading, getModal, getOrder, getUser } from '../../services/helpers/getSelector';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const App = () => {
  const { modalIngredient, modalOrder, modalOrderSuccess, modalNotification } = useAppSelector(getModal);
  const { ingredientsFetchRequest, ingredients } = useAppSelector(getIngredients);
  const { loading } = useAppSelector(getLoading);
  const { orderNumber } = useAppSelector(getOrder);
  const { user } = useAppSelector(getUser);
  const { isTokenExpired } = useAuthorization();
  const location = useLocation();
  const background = modalIngredient || modalOrder ? location?.state?.background : null;
  const { previousUrl } = useAuthorization();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading({ loading: ingredientsFetchRequest }));
  }, [dispatch, ingredientsFetchRequest]);

  useEffect(() => {
    if (ingredients && ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
    if ((!user.isLogout && !user.isLogin && isTokenExpired && user?.token?.refreshToken)
      || (user.isLogin && (!user.name || !user.email))) {
      dispatch(fetchGetUser());
    }
  }, [dispatch, isTokenExpired, user, ingredients, user?.token?.refreshToken]);

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
                    <ProtectedRoute>
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
          <Notification handleModalClose={handleModalClose} title={modalNotification}/>
        )
      }

      <Modal
        handleModalClose={handleModalClose}
        isModalOpen={!!modalIngredient || !!modalOrder || !!modalOrderSuccess}
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
        {background && modalIngredient && (
          <IngredientDetails ingredient={modalIngredient}/>
        )}

        {background && modalOrder && (
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