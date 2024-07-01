import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginAction,
  useLoginUserMutation,
} from '../../Redux/AuthorizationApi';
import css from './UserForms.module.css';
import { showToast } from 'components/Notifications/Notifications';

export function LoginForm() {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isSuccess, isError, error }] = useLoginUserMutation();
  useEffect(() => {
    if (isSuccess) {
      navigate('/home');
      showToast('Вхід успішний', 'success');
    }
    if (isError) {
      showToast('Помилка при вході в систему: ' + error.data.message, 'error');
    }
  }, [isSuccess, isError, error, navigate]);
  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setMail(value);
        break;

      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleLogin = e => {
    e.preventDefault();
    loginSave({ email, password });
  };

  const loginSave = async user => {
    try {
      const returnUser = await loginUser(user, {
        selectFromResult: ({ data }) => data.user,
      });
      dispatch(loginAction(returnUser));
      if (isSuccess) {
        setMail('');
        setPassword('');
      }
    } catch (error) {
      showToast(error, 'Поммилка входу');
    }
  };
  return (
    <>
      <div className={css.userBlock}>
        <p>Для отримання доступу до застосунку - увійди або зареєструйся</p>
        <form className={css.userForm} onSubmit={handleLogin}>
          <input
            className={css.input}
            type="email"
            name="email"
            placeholder="Пошта"
            value={email}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            className={css.input}
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={handleChange}
            autoComplete="off"
          />
          <div className={css.formBtnBlock}>
            <button className={css.userFormBtn} type="submit">
              Увійти
            </button>
            <Link className={css.registerLink} to="/register">
              Зареєструватись
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
