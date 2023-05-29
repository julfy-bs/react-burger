import styles from './app.module.css';
import Header from '../components/header/header.jsx';
import { Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFoundPage } from '../pages';
import { PATH } from '../utils/config';
import clsx from 'clsx';

const App = () => {
  return (
    <>
      <Header/>
      <main className={clsx(styles.main, 'pb-10')}>
        <Routes>
          <Route path={PATH.HOME} element={<HomePage/>}/>
          <Route
            path={PATH.LOGIN}
            element={<LoginPage/>}
          />
          <Route
            path={PATH.REGISTER}
            element={<RegisterPage />}
          />
          <Route
            path={PATH.FORGOT_PASSWORD}
            element={<ForgotPasswordPage/>}
          />
          <Route
            path={PATH.RESET_PASSWORD}
            element={<ResetPasswordPage/>}
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;