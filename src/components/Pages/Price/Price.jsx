import { Form } from 'components/Form/Form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import priceCss from './price.module.css';
import FetchDetails from 'fetch/fetch';
import { Help } from 'components/Help/Help';
import { Footer } from '../Footer/Footer';
import { FilterModal } from 'components/FilterModal/FilterModal';
import { showToast } from 'components/Notifications/Notifications';
import { useSelector } from 'react-redux';

function Price() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const searchQuery = searchParams.get('query') ?? '';
  const [showFilterModal, setShowFilterModal] = useState(false);
  const toggleModal = () => {
    setShowFilterModal(!showFilterModal);
  };
  const [gsm, setGsm] = useState([]);
  const [status, setStatus] = useState('idle');
  const [filter, setFilter] = useState(false);
  const filteredProducts = e => {
    setFilter(gsm.filter(product => product.name.includes(e.target.name)));
  };

  let course = 41;
  const visisbleProducts = filter ? filter : gsm;

  gsm.sort((a, b) => a.name.localeCompare(b.name));
  gsm.sort((a, b) => (b.available ? 1 : 0) - (a.available ? 1 : 0));
  const token = useSelector(state => state.auth.token);
  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery === '') {
        return;
      }

      setStatus('pending');

      try {
        const res = await FetchDetails(searchQuery, token);
        const itemsArray = res[0].items;
        const fullArray = itemsArray.filter(data =>
          data.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (fullArray.length === 0) {
          setStatus('resolved');
          setGsm([]);
          showToast(`По запиту ${searchQuery} нічого не знайдено`, 'error');
        } else {
          showToast(`Знайдено ${fullArray.length} позицій`, 'success');
        }

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
      } catch (error) {
        setStatus('resolved');
        showToast('Сталася помилка під час пошуку', 'error');
        navigate('/login');
      }
    };

    if (isLoggedIn) {
      fetchData();
    } else {
      showToast('Доступ заборонений', 'error');
      navigate('/login');
    }
  }, [isLoggedIn, navigate, searchQuery, token]);

  function formSubmit(query) {
    if (query === searchQuery) {
      return;
    }

    setSearchParams({ query: query.toLowerCase() });
    setGsm([]);
    setStatus('idle');
  }

  return (
    <>
      <section className={priceCss.sectionForm}>
        <Form onSubmit={formSubmit} />
      </section>
      {status === 'pending' ? (
        <div className={priceCss.centeredEllipsis}>
          <ThreeDots color="orange" height={50} width={50} />
        </div>
      ) : (
        <>
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
                <p className={priceCss.star}>
                  * в ціну входить вартість запчастини з роботою{' '}
                </p>
                <table className={priceCss.priceTable}>
                  <tbody>
                    <tr>
                      <th className={priceCss.tableTitle}>Назва</th>
                      <th className={priceCss.tableTitle}>Ціна*</th>
                      <th className={priceCss.tableTitle}>Наявність</th>
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

                      let available = item.available;
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
                          </tr>
                        );
                      }

                      if (newIphone) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>
                            <td className={priceCss.tableTitle}>
                              {newIphoneRepair} грн
                            </td>

                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                          </tr>
                        );
                      }
                      if (item.name.includes('Шлейф')) {
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
                          </tr>
                        );
                      }

                      if (
                        item.name.includes('Тачскрін') ||
                        item.name.includes('Модуль') ||
                        item.name.includes('Дисплей') ||
                        item.name.includes('матриця') ||
                        item.name.includes('Сенсор')
                      ) {
                        return (
                          <tr key={item.vendorCode}>
                            <td className={priceCss.tableItem}> {item.name}</td>
                            <td className={priceCss.tableTitle}>
                              {priceLCD} грн
                            </td>
                            {available ? (
                              <td className={priceCss.tableTitle}>
                                {item.quantity_in_stock}
                              </td>
                            ) : (
                              <td className={priceCss.unavailable}>Запит</td>
                            )}
                          </tr>
                        );
                      }

                      return (
                        <tr key={item.vendorCode}>
                          <td className={priceCss.tableItem}> {item.name}</td>
                          <td className={priceCss.tableTitle}>
                            {iphoneRepair} грн
                          </td>
                          {available ? (
                            <td className={priceCss.tableTitle}>
                              {item.quantity_in_stock}
                            </td>
                          ) : (
                            <td className={priceCss.unavailable}>Запит</td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </>
      )}
      <Help />
      <Footer />
    </>
  );
}

export default Price;
