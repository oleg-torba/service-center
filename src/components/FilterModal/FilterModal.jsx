import modalCss from './filter.module.css';
import priceCss from '../Pages/Price/price.module.css';

export function FilterModal({ filteredProducts }) {
  return (
    <div className={modalCss.modal}>
      <button
        className={priceCss.filterString}
        onClick={filteredProducts}
        name="Акумулятор"
      >
        Акумулятори
      </button>
      <button
        className={priceCss.filterString}
        onClick={filteredProducts}
        name="Бузер"
      >
        Бузер
      </button>
      <button
        className={priceCss.filterString}
        onClick={filteredProducts}
        name="Дисплей"
      >
        Дисплеї
      </button>
      <button
        className={priceCss.filterString}
        onClick={filteredProducts}
        name="Камера"
      >
        Камери
      </button>
      <button
        className={priceCss.filterString}
        onClick={filteredProducts}
        name="Роз'єм"
      >
        Роз'єми
      </button>
      <button
        className={priceCss.filterString}
        onClick={filteredProducts}
        name="Динамік"
      >
        Спікер
      </button>
      <button
        className={priceCss.filterString}
        onClick={filteredProducts}
        name="Шлейф"
      >
        Шлейфи
      </button>
      <button
        className={priceCss.filterString}
        onClick={filteredProducts}
        name="Чохол"
      >
        Чохли
      </button>
      <button
        className={priceCss.filterString}
        onClick={filteredProducts}
        name="Захисне"
      >
        Зах скло
      </button>
      <button
        className={priceCss.filterString}
        onClick={filteredProducts}
        name="Скло камери"
      >
        Скло камери
      </button>
    </div>
  );
}
