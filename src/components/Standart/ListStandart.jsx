import heroCss from '../Pages/Home/Hero.module.css';
export function ListStandart() {
  return (
    <section className="section">
      <div className={heroCss.mainContainer}>
        <h2 className={heroCss.title}>Прайс</h2>
        <div className={heroCss.repairBlock}>
          <ul>
            <li className={heroCss.serviceListPrice}>
              <p className={heroCss.serviceTitlePrice}>Заміна акумулятора:</p>
              <p className={heroCss.serviceTitleSpan}>від 500 грн</p>
            </li>
            <li className={heroCss.serviceListPrice}>
              <p className={heroCss.serviceTitlePrice}>
                Заміна роз’ємів зарядки:
              </p>
              <p className={heroCss.serviceTitleSpan}>від 300 грн</p>
            </li>
            <li className={heroCss.serviceListPrice}>
              <p className={heroCss.serviceTitlePrice}>
                Розблокування облікового запису (пошта):
              </p>
              <p className={heroCss.serviceTitleSpan}>від 500 грн</p>
            </li>
            <li className={heroCss.serviceListPrice}>
              <p className={heroCss.serviceTitlePrice}>
                Розблокування облікового запису (Mi):
              </p>
              <p className={heroCss.serviceTitleSpan}>від 1500 грн</p>
            </li>
            <li className={heroCss.serviceListPrice}>
              <p className={heroCss.serviceTitlePrice}>Прошивка:</p>
              <p className={heroCss.serviceTitleSpan}>від 300 грн</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
