import styles from './app.module.css';
import Header from '../header/header.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
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
  IngredientPage
} from '../../pages/index.js';
import clsx from 'clsx';
import Modal from '../modal/modal.jsx';
import Notification from '../notification/notification.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/loader.jsx';
import ProtectedRoute from '../protected-route/protected-route.jsx';
import { useEffect } from 'react';
import { setLoading } from '../../services/slices/loadingSlice.js';
import { useFetch } from '../../hooks/useFetch.js';
import { useModal } from '../../hooks/useModal.js';
import { fetchGetUser } from '../../services/asyncThunk/profileThunk.js';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk.js';
import { PATH } from '../../utils/config.js';
import { useAuthorization } from '../../hooks/useAuthorization.js';

const App = () => {
  const {
    ingredientsFetchRequest,
    ingredientsFetchFailed,
    ingredientsNotification,
    ingredientsError,
    ingredients
  } = useSelector(store => store.ingredients);
  const {
    modalIngredient, modalOrder, modalNotification
  } = useModal();
  const { isUserLoggedIn } = useAuthorization();
  const { errorMessage } = useSelector(store => store.profile);
  const { loading } = useSelector(store => store.loading);
  const dispatch = useDispatch();
  const { handleFulfilledFetch, handleRejectedFetch } = useFetch();
  const location = useLocation();
  const background = modalIngredient ? location.state.background : null;

  useEffect(() => {
    dispatch(setLoading({ loading: ingredientsFetchRequest }));
  }, [dispatch, ingredientsFetchRequest]);

  useEffect(() => {
    dispatch(fetchIngredients());
    isUserLoggedIn && dispatch(fetchGetUser());
  }, [dispatch, isUserLoggedIn]);

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
                  element={<LoginPage/>}
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
                    <ProtectedRoute
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
                  element={<NotFoundPage/>}
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

      <Notification
        title={
          modalNotification
            ? modalNotification
            : errorMessage
              ? errorMessage
              : ''
        }
      >
      </Notification>

      <Modal
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
          <OrderDetails/>
        )}
      </Modal>
    </>
  );
};

export default App;