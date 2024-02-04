import heroCss from './Hero.module.css';
import serviceImg from '../../../images/serviceImg.jpg';
import aboutImg from '../../../images/about.jpg';
import sprite from '../../../images/sprite.svg';
import { Footer } from '../Footer/Footer';
function Home() {
  return (
    <>
      <main>
        <div>
          <section className="section">
            <div className={heroCss.mainTitleBlock}>
              <h1 className={heroCss.repairTitle}>Ремонт та сервіс</h1>
              <span className={heroCss.repairTitleSecond}>
                Ми - команда професіоналів, готова повернути Ваш телефон до
                життя! Проведемо ремонт телефону у Львові, Сумах, Рівному!
              </span>
            </div>
          </section>
          <section className={heroCss.hero}></section>
          <section className="section">
            <h2 className={heroCss.title}>Послуги</h2>
            <div className={heroCss.serviceBlock}>
              <img className={heroCss.img} src={serviceImg} alt="serviceImg" />
              <ul className={heroCss.service}>
                <li className={heroCss.serviceList}>
                  <p className={heroCss.serviceTitle}>Прошивка</p>
                  <svg width={19} height={19}>
                    <use href={`${sprite}#foundIcon`} />
                  </svg>
                </li>
                <li className={heroCss.serviceList}>
                  <p className={heroCss.serviceTitle}>Розблокування</p>
                  <svg width={19} height={19}>
                    <use href={`${sprite}#foundIcon`} />
                  </svg>
                </li>
                <li className={heroCss.serviceList}>
                  <p className={heroCss.serviceTitle}>Заміна дисплею</p>
                  <svg width={19} height={19}>
                    <use href={`${sprite}#foundIcon`} />
                  </svg>
                </li>
                <li className={heroCss.serviceList}>
                  <p className={heroCss.serviceTitle}>Заміна роз’єму зарядки</p>
                  <svg width={19} height={19}>
                    <use href={`${sprite}#foundIcon`} />
                  </svg>
                </li>
                <li className={heroCss.serviceList}>
                  <p className={heroCss.serviceTitle}>Інші послуги</p>
                  <svg width={19} height={19}>
                    <use href={`${sprite}#foundIcon`} />
                  </svg>
                </li>
              </ul>
            </div>
          </section>
          <section className="section">
            <h2 className={heroCss.title}>Про сервіс</h2>
            <div className={heroCss.serviceBlock}>
              <img className={heroCss.img} src={aboutImg} alt="about" />
              <ul className={heroCss.service}>
                <li className={heroCss.serviceList}>
                  <p className={heroCss.serviceTitleSecond}>
                    Досвідчена команда фахівців
                  </p>
                </li>
                <li className={heroCss.serviceList}>
                  <p className={heroCss.serviceTitleSecond}>
                    Оригінальні комплектуючі
                  </p>
                </li>
                <li className={heroCss.serviceList}>
                  <p className={heroCss.serviceTitleSecond}>
                    Швидкість обслуговування
                  </p>
                </li>
                <li className={heroCss.serviceList}>
                  <p className={heroCss.serviceTitleSecond}>Доступні ціни</p>
                </li>
                <li className={heroCss.serviceList}>
                  <p className={heroCss.serviceTitleSecond}>Гарантія якості</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
export default Home;
