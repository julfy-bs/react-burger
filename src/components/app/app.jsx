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
import { useCallback, useEffect } from 'react';
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
  const { orderNumber } = useSelector(store => store.order);
  const { isUserLoggedIn, isTokenExpired } = useModal();
  const {
    modalIngredient, modalOrder, modalNotification, closeAnyModal, isModalOpen
  } = useModal();
  const { errorMessage } = useSelector(store => store.profile);
  const { loading } = useSelector(store => store.loading);
  const dispatch = useDispatch();
  const { handleFulfilledFetch, handleRejectedFetch } = useFetch();
  const location = useLocation();
  const background = modalIngredient ? location.state.background : null;
  const { previousUrl } = useAuthorization();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading({ loading: ingredientsFetchRequest }));
  }, [dispatch, ingredientsFetchRequest]);

  useEffect(() => {
    dispatch(fetchIngredients());
    (isUserLoggedIn || isTokenExpired) && dispatch(fetchGetUser());
  }, [dispatch, isUserLoggedIn, isTokenExpired]);

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

  const handleModalClose = useCallback(() => {
    closeAnyModal();
    (modalIngredient || modalOrder) &&
    navigate(previousUrl, {
      replace: true,
      state: { background: null }
    });
  }, [closeAnyModal, modalIngredient, modalOrder, navigate, previousUrl]);


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

        {orderNumber && modalOrder && (
          <OrderDetails/>
        )}
      </Modal>
    </>
  );
};

export default App;