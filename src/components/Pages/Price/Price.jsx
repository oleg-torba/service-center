import { Form } from 'components/Form/Form';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import priceCss from './price.module.css';
import FetchDetails from 'fetch/fetch';
import { ListStandart } from 'components/Standart/ListStandart';
import { NotificationManager } from 'react-notifications';
import { Help } from 'components/Help/Help';
import { Footer } from '../Footer/Footer';
import { FilterModal } from 'components/FilterModal/FilterModal';
import Loader from 'components/Loader/Loader';
function Price() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') ?? '';
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [createdAt, setCreatedAT] = useState(null);
  const toggleModal = () => {
    setShowFilterModal(!showFilterModal);
  };
  const [gsm, setGsm] = useState([]);
  const [status, setStatus] = useState('idle');
  const [filter, setFilter] = useState(false);
  const filteredProducts = e => {
    setFilter(gsm.filter(product => product.name.includes(e.target.name)));
  };
  let course = 38.5;
  const visisbleProducts = filter ? filter : gsm;
  gsm.sort((a, b) => a.name.localeCompare(b.name));
  gsm.sort((a, b) => (b.available ? 1 : 0) - (a.available ? 1 : 0));
  useEffect(() => {
    // if (searchQuery === '') {
    //   return;
    // }
    setStatus('pending');
    FetchDetails(searchQuery).then(res => {
      const itemsArray = res[0];
      const dateObject = new Date(itemsArray.createdAt);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();

      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
        day < 10 ? '0' : ''
      }${day} ${hours}:${minutes}`;
      const searchWords = searchQuery.split(' ');
      const regex = new RegExp(
        searchWords.map(word => `(?=.*\\b${word}\\b)`).join(''),
        'i'
      );
      const fullArray = itemsArray.items.filter(data => regex.test(data.name));

      setCreatedAT(formattedDate);
      setGsm(
        fullArray.filter(
          data =>
            !data.name.includes('MECHANIC') &&
            !data.name.includes('Шлейф для тестера') &&
            !data.name.includes('для програматора') &&
            !data.name.includes('без шлейфа') &&
            !data.name.includes('INCELL') &&
            !data.name.includes('скотч для фіксації') &&
            !data.name.includes('в упаковці') &&
            !data.name.includes('TORNADO') &&
            !data.name.includes('Mechanic') &&
            !data.name.includes('TOTA') &&
            !data.name.includes('Уцінка')
        )
      );
      setStatus('resolved');
      setFilter('');
    });
  }, [createdAt, searchQuery]);

  function formSubmit(query) {
    if (query === searchQuery) {
      return;
    }

    setSearchParams(query.toLowerCase());
    setGsm([]);
  }
  if (gsm.length < 1 && status === 'resolved') {
    NotificationManager.error(
      'У нашій базі відсутня інформація про цей пристрій',
      'Упс, помилка',
      3000
    );
  }

  return (
    <>
      <section className={priceCss.sectionForm}>
        <Form onSubmit={formSubmit} />
      </section>
      {status === 'pending' ? (
        <Loader />
      ) : (
        <>
          {createdAt !== null && (
            <span className={priceCss.updateString}>
              Останнє оновлення бази: {createdAt}
            </span>
          )}

          <div className={priceCss.mainBlock}>
            {gsm.length > 0 && (
              <>
                <div className={priceCss.filterModalBlock}>
                  <button
                    onClick={toggleModal}
                    className={priceCss.filterString}
                  >
                    Фільтри
                  </button>

                  {showFilterModal === true && (
                    <FilterModal filteredProducts={filteredProducts} />
                  )}
                </div>

                <div className={priceCss.availableBlock}>
                  <button
                    className={priceCss.filterButton}
                    onClick={filteredProducts}
                    name="Акумулятор"
                  >
                    Акумулятори
                  </button>
                  <button
                    className={priceCss.filterButton}
                    onClick={filteredProducts}
                    name="Бузер"
                  >
                    Бузер
                  </button>
                  <button
                    className={priceCss.filterButton}
                    onClick={filteredProducts}
                    name="Дисплей"
                  >
                    Дисплеї
                  </button>
                  <button
                    className={priceCss.filterButton}
                    onClick={filteredProducts}
                    name="Камера"
                  >
                    Камери
                  </button>
                  <button
                    className={priceCss.filterButton}
                    onClick={filteredProducts}
                    name="Роз'єм"
                  >
                    Роз'єми
                  </button>
                  <button
                    className={priceCss.filterButton}
                    onClick={filteredProducts}
                    name="Динамік"
                  >
                    Спікер
                  </button>
                  <button
                    className={priceCss.filterButton}
                    onClick={filteredProducts}
                    name="Шлейф"
                  >
                    Шлейфи
                  </button>
                  <button
                    className={priceCss.filterButton}
                    onClick={filteredProducts}
                    name="Чохол"
                  >
                    Чохли
                  </button>
                  <button
                    className={priceCss.filterButton}
                    onClick={filteredProducts}
                    name="Захисне"
                  >
                    Зах скло
                  </button>
                  <button
                    className={priceCss.filterButton}
                    onClick={filteredProducts}
                    name="Скло камери"
                  >
                    Скло камери
                  </button>
                </div>

                <table className={priceCss.priceTable}>
                  <tbody>
                    <tr>
                      <th className={priceCss.tableTitle}>Назва</th>
                      <th className={priceCss.tableTitle}>Ціна</th>
                      <th className={priceCss.tableTitle}>Наявність</th>
                      <th className={priceCss.tableTitle}>Гарантія</th>
                    </tr>

                    {visisbleProducts.map(item => {
                      let priceLCD =
                        Math.ceil(((item.price + 25) * course) / 50) * 50;

                      let priceCharge =
                        Math.ceil(((item.price + 13) * course) / 50) * 50;
                      let glassCam =
                        Math.ceil(((item.price + 13) * course) / 50) * 50;
                      let iphoneRepair =
                        Math.ceil(((item.price + 25) * course) / 50) * 50;
                      let newIphoneRepair =
                        Math.ceil(((item.price + 28) * course) / 50) * 50;
                      let ICNewIphoneRepair =
                        Math.ceil(((item.price + 50) * course) / 50) * 50;
                      let available = item.available;
                      let copyDisplays = item.name.includes('OLED');
                      let CasePrice =
                        Math.ceil(((item.price + 4) * course) / 50) * 50;
                      let newIphone =
                        item.name.includes('iPhone 11') ||
                        item.name.includes('iPhone 11 Pro') ||
                        item.name.includes('iPhone 11 Pro Max') ||
                        item.name.includes('iPhone 12') ||
                        item.name.includes('iPhone 12 Mini') ||
                        item.name.includes('iPhone 12 Pro') ||
                        item.name.includes('iPhone 12 Pro Max') ||
                        item.name.includes('iPhone 13 Pro Max') ||
                        item.name.includes('iPhone 13 Pro') ||
                        item.name.includes('iPhone 13');

                      if (item.price >= 25) {
                        priceLCD =
                          Math.ceil(((item.price + 22) * course) / 50) * 50;
                      }

                      if (item.price >= 90) {
                        // eslint-disable-next-line no-unused-vars
                        priceLCD =
                          Math.ceil(((item.price + 25) * course) / 50) * 50;
                      }

                      if (item.name.includes('Акумулятор')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            <td className={priceCss.tableTitle}>
                              {priceCharge} грн
                            </td>

                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Чохол')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            <td className={priceCss.tableTitle}>
                              {CasePrice} грн
                            </td>

                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Захисне скло')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            <td className={priceCss.tableTitle}>
                              {CasePrice} грн
                            </td>

                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Бузер')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            <td className={priceCss.tableTitle}>
                              {priceCharge} грн
                            </td>

                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('SIM-тримач')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            <td className={priceCss.tableTitle}>
                              {CasePrice} грн
                            </td>

                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Рамка корпусу')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            <td className={priceCss.tableTitle}>
                              {priceCharge} грн
                            </td>

                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Динамік')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}>{item.name}</td>

                            <td className={priceCss.tableTitle}>
                              {priceCharge} грн
                            </td>

                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Дисплей')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            {newIphone ? (
                              <td className={priceCss.tableTitle}>
                                {iphoneRepair} грн
                              </td>
                            ) : (
                              <td className={priceCss.tableTitle}>
                                {priceLCD} грн
                              </td>
                            )}
                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {' '}
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            {copyDisplays ? (
                              <td className={priceCss.unavailable}>
                                Без гарантії
                              </td>
                            ) : (
                              <td className={priceCss.tableTitle}>30 днів</td>
                            )}
                          </tr>
                        );
                      }
                      if (
                        item.name.toLowerCase().includes('задня частина') ||
                        item.name.toLowerCase().includes('кришка задня')
                      ) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            {newIphone ? (
                              <td className={priceCss.tableTitle}>
                                {iphoneRepair} грн
                              </td>
                            ) : (
                              <td className={priceCss.tableTitle}>
                                {priceCharge} грн
                              </td>
                            )}
                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Камера')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            {newIphone ? (
                              <td className={priceCss.tableTitle}>
                                {newIphoneRepair} грн
                              </td>
                            ) : (
                              <td className={priceCss.tableTitle}>
                                {priceCharge} грн
                              </td>
                            )}
                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Корпус')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            {newIphone ? (
                              <td className={priceCss.tableTitle}>
                                {newIphoneRepair} грн
                              </td>
                            ) : (
                              <td className={priceCss.tableTitle}>
                                {priceCharge} грн
                              </td>
                            )}
                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Скло камери')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            <td className={priceCss.tableTitle}>
                              {glassCam} грн
                            </td>
                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Мікросхема')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            {newIphone ? (
                              <td className={priceCss.tableTitle}>
                                {ICNewIphoneRepair} грн
                              </td>
                            ) : (
                              <td className={priceCss.tableTitle}>
                                {priceCharge} грн
                              </td>
                            )}
                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (
                        item.name.toLowerCase().includes("роз'єм заряд") ||
                        item.name.toLowerCase().includes('charge')
                      ) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            {newIphone ? (
                              <td className={priceCss.tableTitle}>
                                {iphoneRepair} грн
                              </td>
                            ) : (
                              <td className={priceCss.tableTitle}>
                                {priceCharge} грн
                              </td>
                            )}
                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Тачскрін')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            {newIphone ? (
                              <td className={priceCss.tableTitle}>
                                {iphoneRepair} грн
                              </td>
                            ) : (
                              <td className={priceCss.tableTitle}>
                                {priceCharge} грн
                              </td>
                            )}
                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      }
                      if (item.name.includes('Шлейф')) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>

                            {newIphone ? (
                              <td className={priceCss.tableTitle}>
                                {iphoneRepair} грн
                              </td>
                            ) : (
                              <td className={priceCss.tableTitle}>
                                {priceCharge} грн
                              </td>
                            )}
                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                            <td className={priceCss.tableTitle}>30 днів</td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </>
      )}
      <section className={priceCss.sectionForm}>
        <Help />
      </section>
      <ListStandart />
      <Footer />
    </>
  );
}

export default Price;
