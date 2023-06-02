import styles from './app.module.css';
import Header from '../header/header.jsx';
import { Route, Routes } from 'react-router-dom';
import {
  ConstructorPage,
  LoginPage,
  LogoutPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  ProfilePage
} from '../../pages/index.js';
import { PATH } from '../../utils/config.js';
import clsx from 'clsx';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { useDispatch, useSelector } from 'react-redux';
import AppDetails from '../app-details/app-details.jsx';
import Loader from '../loader/loader.jsx';
import { useEffect } from 'react';
import { setLoading } from '../../services/slices/loadingSlice.js';
import { resetError, setError } from '../../services/slices/errorSlice.js';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk.js';
import ProtectedRoute from '../protected-route/protected-route.jsx';
import { useModal } from '../../hooks/useModal.js';

const App = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(store => store.error);
  const { orderNumber } = useSelector(store => store.order);
  const {
    modalIngredient,
    isDetailedOrderOpened,
    isDetailedIngredientOpened,
    detailedInformation,
    isDetailedInformationOpened
  } = useModal();
  const { errorMessage, isLogin } = useSelector(store => store.profile);
  const { loading } = useSelector(store => store.loading);

  const { ingredientsFetchRequest, ingredientsFetchFailed } = useSelector(store => store.ingredients);

  useEffect(() => {
    // console.log(localStorage);
    dispatch(setLoading({ loading: ingredientsFetchRequest }));
  }, [dispatch, ingredientsFetchRequest]);

  useEffect(() => {
    ingredientsFetchFailed
      ? dispatch(setError({
        code: null,
        message: 'Ошибка загрузки ингредиентов'
      }))
      : dispatch(resetError());
  }, [dispatch, ingredientsFetchFailed]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <Header/>
      <main className={clsx(styles.main, 'pb-10')}>
        {
          loading
            ? (<Loader loading={loading}/>)
            : (<Routes>
              <Route
                path={PATH.HOME}
                element={<ConstructorPage/>}
              />
              <Route
                path={PATH.LOGIN}
                element={<LoginPage/>}
              />
              <Route
                path={PATH.LOGOUT}
                element={<LogoutPage/>}
              />
              <Route
                path={PATH.REGISTER}
                element={<RegisterPage/>}
              />
              <Route
                path={PATH.FORGOT_PASSWORD}
                element={<ForgotPasswordPage/>}
              />
              <Route
                path={PATH.RESET_PASSWORD}
                element={<ResetPasswordPage/>}
              />
              <Route
                path={PATH.PROFILE}
                element={
                  <ProtectedRoute redirectTo={PATH.LOGIN}>
                    <ProfilePage/>
                  </ProtectedRoute>
                }
              />
              <Route
                path={PATH.ORDERS}
                element={
                  <ProtectedRoute redirectTo={PATH.LOGIN}>
                    <ProfilePage/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={<NotFoundPage/>}
              />
            </Routes>)
        }
      </main>

      <Modal
        title={
          modalIngredient
            ? 'Детали ингредиента'
            : detailedInformation
              ? detailedInformation
              : errorMessage
                ? errorMessage
                : ''
        }

        ariaTitle={
          isDetailedOrderOpened
            ? 'Идентификатор заказа'
            : ''
        }
        info={!!detailedInformation || !!errorMessage}
      >
        {modalIngredient && isDetailedIngredientOpened && (
          <IngredientDetails ingredient={modalIngredient}/>
        )}

        {orderNumber && isDetailedOrderOpened && (
          <OrderDetails/>
        )}

        {detailedInformation && isDetailedInformationOpened && (
          <AppDetails message={detailedInformation}/>
        )}

        {(errorMessage) && (
          <AppDetails/>
        )}
      </Modal>
    </>
  );
};

export default App;