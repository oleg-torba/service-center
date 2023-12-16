import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { useState } from 'react';
import headerCss from './Header.module.css';
import heroCss from '../Pages/Home/Hero.module.css';
import { MobModal } from 'components/MobMenuModal/MobModal';
import { GiHamburgerMenu } from 'react-icons/gi';
import modalCss from '../MobMenuModal/modal.module.css';

function Layout() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="container">
      <header>
        <div className={headerCss.header}>
          <NavLink
            className={headerCss.mainTitle}
            to="/"
            state={{ from: location }}
            style={({ isActive }) =>
              isActive
                ? {
                    color: '#fda700',
                  }
                : { color: '#ffffff' }
            }
          >
            Сервіс
          </NavLink>
          <NavLink
            className={headerCss.title}
            to="/price"
            state={{ from: location }}
            style={({ isActive }) =>
              isActive
                ? {
                    color: '#fda700',
                  }
                : { color: '#ffffff' }
            }
          >
            Прайс
          </NavLink>
          <NavLink className={headerCss.title} to="/">
            Сервіс-центри
          </NavLink>
          <NavLink className={headerCss.title} to="/">
            Про компанію
          </NavLink>
          <NavLink className={headerCss.title} to="/">
            Оплата та доставка
          </NavLink>
          <NavLink className={headerCss.title} to="/">
            Контакти
          </NavLink>

        <p>068-68-68-599</p>
        </div>
        {showModal === true ? (
          <MobModal onClose={toggleModal}>
            <div className={headerCss.mobMenu}>
              <NavLink
                className={headerCss.mobMenuMainTitle}
                to="/"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: '#fda700',
                      }
                    : { color: '#ffffff' }
                }
              >
                Сервіс
              </NavLink>
              <NavLink
                className={headerCss.mobMenuTitle}
                to="/price"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: '#fda700',
                      }
                    : { color: '#ffffff' }
                }
              >
                Прайс
              </NavLink>
              <NavLink className={headerCss.mobMenuTitle} to="/">
                Сервіс-центри
              </NavLink>
              <NavLink className={headerCss.mobMenuTitle} to="/">
                Про компанію
              </NavLink>
              <NavLink className={headerCss.mobMenuTitle} to="/">
                Оплата та доставка
              </NavLink>
              <NavLink className={headerCss.mobMenuTitle} to="/">
                Контакти
              </NavLink>

              <p>068-68-68-599</p>
            </div>
          </MobModal>
        ) : (
          <GiHamburgerMenu
            className={modalCss.openModal}
            onClick={toggleModal}
          />
        )}
      </header>

      <main className={heroCss.main}>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default Layout;
