import helpCss from './Help.module.css';
import { useState } from 'react';
import helpImg from '../../images/Help.jpg';
import axios from 'axios';

export function Help() {
  const [phone, setNumber] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'message':
        setMessage(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await axios.post(`https://back-2cjl.onrender.com/api/help`, {
      name,
      phone,
      message,
    });
    if (res.status === 201) {
      alert('Дані успішно відправлено');
      setMessage('');
      setName('');
      setNumber('');
      return res.data;
    }
  };

  return (
    <section>
      <p className={helpCss.helpTitle}>Форма зворотнього зв'язку</p>
      <p className={helpCss.helpTitleTG}>
        Не знайшли, що шукали? Напишіть у{' '}
        <a href="https://t.me/oleg_torba">Telegram</a> або заповніть форму
      </p>
      <div className={helpCss.helpBlock}>
        <img src={helpImg} alt="Help" />
        <form className={helpCss.helpForm} onSubmit={handleSubmit}>
          <input
            className={helpCss.input}
            type="text"
            name="name"
            value={name}
            required
            onChange={handleChange}
            placeholder="Ім'я"
          />
          <input
            className={helpCss.input}
            type="tel"
            name="number"
            value={phone}
            required
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder="Ваш номер телефону"
          />
          <textarea
            className={helpCss.textarea}
            name="message"
            onChange={handleChange}
            value={message}
            placeholder="Введіть запитання"
            required
          ></textarea>
          <button className={helpCss.button} type="submit">
            Надіслати
          </button>
        </form>
      </div>
    </section>
  );
}
