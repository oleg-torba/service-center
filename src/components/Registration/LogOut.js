import { useSelector, useDispatch } from 'react-redux';
import css from './UserForms.module.css';
import {
  useLogoutUserMutation,
  logoutAction,
} from '../../Redux/AuthorizationApi';
import { showToast } from 'components/Notifications/Notifications';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutUserMutation();
  const user = useSelector(state => state.auth.user.name);
  const id = useSelector(state => state.auth.user.id);
  const logoutSave = async () => {
    try {
      await logout(id).unwrap();
      dispatch(logoutAction());
      showToast('Вихід успішний', 'success');
      navigate('/login');
    } catch (error) {
      showToast('Помилка', 'error');
      navigate('/login');
    }
  };
  return (
    <div className={css.userInfoBlock}>
      <p>
        Привіт, <span className={css.user}>{user}</span>
      </p>
      <button className={css.logoutBtn} onClick={() => dispatch(logoutSave)}>
        Вийти
      </button>
    </div>
  );
}
