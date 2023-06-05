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
  ProfilePage,
  ProfileFormPage,
  ProfileOrdersPage
} from '../../pages/index.js';
import clsx from 'clsx';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { useDispatch, useSelector } from 'react-redux';
import AppDetails from '../app-details/app-details.jsx';
import Loader from '../loader/loader.jsx';
import ProtectedRoute from '../protected-route/protected-route.jsx';
import { useEffect } from 'react';
import { setLoading } from '../../services/slices/loadingSlice.js';
import { useFetch } from '../../hooks/useFetch.js';
import { useModal } from '../../hooks/useModal.js';
import { getCookie } from '../../services/helpers/getCookie.js';
import { fetchGetUser } from '../../services/asyncThunk/profileThunk.js';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk.js';
import { PATH } from '../../utils/config.js';
import { ACCESS_TOKEN } from '../../utils/constants.js';

const App = () => {
  const {
    ingredientsFetchRequest,
    ingredientsFetchFailed,
    ingredientsNotification,
    ingredientsError
  } = useSelector(store => store.ingredients);
  const {
    modalIngredient,
    isDetailedOrderOpened,
    isDetailedIngredientOpened,
    detailedInformation,
    isDetailedInformationOpened
  } = useModal();
  const { errorMessage } = useSelector(store => store.profile);
  const { loading } = useSelector(store => store.loading);
  const { orderNumber } = useSelector(store => store.order);
  const dispatch = useDispatch();

  const { handleFulfilledFetch, handleRejectedFetch } = useFetch();


  useEffect(() => {
    dispatch(setLoading({ loading: ingredientsFetchRequest }));
  }, [dispatch, ingredientsFetchRequest]);

  useEffect(() => {
    dispatch(fetchIngredients());
    const token = getCookie(ACCESS_TOKEN);
    if (token) dispatch(fetchGetUser());
  }, [dispatch]);

  useEffect(() => {
    handleFulfilledFetch({
      fetchStatus: ingredientsFetchRequest,
      fetchError: ingredientsFetchFailed,
      message: ingredientsNotification,
    });
    handleRejectedFetch({
      fetchStatus: ingredientsFetchRequest,
      fetchError: ingredientsFetchFailed,
      errorMessage: ingredientsError,
    });
  });

  return (
    <>
      <Header/>
      <main className={clsx(styles.main, 'pb-10')}>
        {
          loading
            ? (<Loader loading={loading}/>)
            : (
              <Routes>
                <Route
                  path={PATH.HOME}
                  element={<ConstructorPage/>}
                />
                <Route
                  path={PATH.LOGIN}
                  element={
                    <LoginPage/>
                  }
                />
                <Route
                  path={PATH.LOGOUT}
                  element={
                    <LogoutPage/>
                  }
                />
                <Route
                  path={PATH.REGISTER}
                  element={
                    <RegisterPage/>
                  }
                />
                <Route
                  path={PATH.FORGOT_PASSWORD}
                  element={
                    <ForgotPasswordPage/>
                  }
                />
                <Route
                  path={PATH.RESET_PASSWORD}
                  element={
                    <ResetPasswordPage/>
                  }
                />
                <Route path={PATH.PROFILE} element={
                  <ProtectedRoute redirectTo={PATH.LOGIN}>
                    <ProfilePage/>
                  </ProtectedRoute>
                }>
                  <Route index element={<ProfileFormPage/>}/>
                  <Route path={PATH.ORDERS} element={<ProfileOrdersPage/>}/>
                </Route>
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