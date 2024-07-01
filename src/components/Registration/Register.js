import { useEffect, useState } from 'react';
import {
  authAction,
  useRegisterUserMutation,
} from '../../Redux/AuthorizationApi';
import { useDispatch } from 'react-redux';
import css from './UserForms.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from 'components/Notifications/Notifications';

export function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [registerUser, { isSuccess, isError, error }] =
    useRegisterUserMutation();
  useEffect(() => {
    if (isSuccess) {
      navigate('/home');
      showToast('Реєстрація успішна, увійдіть у систему', 'success');
    }
    if (isError) {
      showToast('Помилка при реєстрації: ' + error.data.message, 'error');
    }
  }, [isSuccess, isError, error, navigate]);
  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

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
  const handleSubmit = e => {
    e.preventDefault();
    saveRegister({ name, email, password });

    if (isSuccess) {
      setMail('');
      setPassword('');
    }
  };
  const saveRegister = async user => {
    try {
      const returnedUser = await registerUser(user, {
        selectFromResult: ({ data }) => data.user,
      });
      dispatch(authAction(returnedUser));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={css.userBlock}>
        <p>Для отримання доступу до застосунку - увійди або зареєструйся</p>
        <form className={css.userForm} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="name"
            placeholder="Ім'я"
            value={name}
            onChange={handleChange}
          />
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
              Зареєструватись
            </button>
            <Link className={css.registerLink} to="/login">
              Увійти
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
